# Crono dashboard

A single-screen sales dashboard built from the Figma design of the Crono test task.

**Live:** https://crono-dashboard-eight.vercel.app

**Stack:** Vite · React 19 · TypeScript (strict) · Tailwind CSS 4. No UI library — the one interactive
piece, the Action menu, is the native Popover API plus a little keyboard handling.

## Running it

```bash
npm install
npm run dev
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | dev server on http://localhost:5173           |
| `npm run build`     | type-check and production build               |
| `npm run preview`   | serve the production build                    |
| `npm run typecheck` | `tsc -b`                                      |
| `npm run lint`      | oxlint (the linter the Vite template ships)   |
| `npm run test`      | vitest                                        |
| `npm run format`    | prettier, with the Tailwind class-sort plugin |

The design is best judged at **1440 × 750**, the size of the Figma frame.

## What is in it

- **Layout.** On desktop the whole page fits one screen and only the Signals list scrolls. Under
  ~700px of window height the page scrolls as a whole instead of clipping. Below 1280px the columns
  stack; below 768px the sidebar becomes a drawer. Above 1600px the content stops growing and centres.
- **Collapsible sidebar** via the `«` button, state kept locally. The right column has no collapse
  control on purpose: the design draws none, and an invented handle would sit outside its language.
- **Signals.** `Action` opens a menu with `Complete` and `Delete`, styled after the export's tooltip.
  Either one lowers the unread counter next to the title. `Complete` greys the row out and stays;
  `Delete` removes it. The menu closes on outside click, `Escape`, scroll and resize, and works from
  the keyboard (`Enter`, arrows, `Home`/`End`, `Escape`). Focus goes back to the `Action` button after
  `Complete`, and to the next row's button after `Delete`; when the list empties it lands on the
  empty-state message.
- **Loading, error and empty states** for every block, drawn to that block's own geometry.

## Decisions worth knowing

**The unread counter is derived, never stored.** The list state is `{ items, completed, deleted }`;
the counter is "visible rows that are unread and not completed". It therefore cannot go negative,
cannot drop twice for the same signal, and re-loading the list does not resurrect handled rows.
Covered by `src/components/signals/signalsReducer.test.ts`.

**One way in for data.** Everything goes through `src/data/api.ts`, which returns promises after a
450ms delay. Swapping fixtures for a real backend is a change in that one file. Fixtures live one
file per block in `src/data`, each with its own type, and dates are fixed ISO strings formatted in
UTC so every render looks the same.

Two query parameters drive the states that are otherwise hard to catch:

```
?delay=3000          slow every request down
?fail=signals,kpi    keep those requests failing (also ?fail=all)
```

**Assets.** The export references ten image files that were not shipped with it, and its five
onboarding illustrations came out as empty masks. Those — avatars, the trial banner's swirl, the
onboarding illustrations — are cropped out of `full_page.png` at 2x rather than replaced with
stand-ins. The 24 icons are the export's own inline SVGs with their single fill swapped for
`currentColor`.

**Tailwind 4**, so the theme is `@theme` inside `src/index.css`, not a config file. Tokens keep the
names used in the export (`--color-crono-dark`, `--text-h5`, …) so any value in the design can be
traced to a utility class and back.

**Card edges are inset rings, not borders.** Figma strokes are drawn inside the frame, so a real 1px
border would push every inner offset one pixel off the design.

## Where the design contradicts itself

Reproduced as drawn, because they are the design's decisions, not accidents to tidy up:

- The `May's performance` card starts at y=21 while its neighbours start at y=16, and its bottom
  still lines up with the tasks row.
- KPI cards are 71px tall in the first row and 72px in the other two, with 7px and 8px gaps.
- Task tiles have a 12.21px corner radius.
- Dividers sit between tiles 1|2 and 3|4 of `Today's tasks`, but not between 2|3.
- Four of the six KPI numbers sit right-aligned in a hand-sized text box, leaving 3–6px after the
  icon; the other two sit flush. Kept, but as a _minimum_ width, so a longer number grows instead of
  colliding with its target.
- The `Action` button is `#1EBAB2` while the rest of the accent colour in the design is `#0A9B94`.
- The Signals counter says 12 with five rows drawn, so the fixture has 12 signals — the counter is
  data, not the length of what fits on screen.

One thing is **not** reproduced. Every filled KPI bar in the design is drawn at the same width
(88 of 166px) whatever its numbers say — including `Companies engaged`, which reads `0/500` under a
half-filled bar. Bar width here is always `value / target`, clamped to 0–100% and guarded against a
zero target, and the two "engaged" counters carry real numbers instead of the design's zeros. A
half-filled bar over a zero would read as a bug in the code rather than a quirk of the mockup.

## Layout checks

Numbers were not eyeballed. `audit/` (untracked, local only) holds three small scripts: one screenshots
the running page at the design's own 2x scale, one probes pixel positions in a PNG, and one compares
the ink boxes of 37 known elements between the render and `full_page.png`. Every card, tile, KPI cell,
progress bar, avatar, row and button lands within a pixel of the design; the rest of the difference is
font rasterisation, and the one deliberate gap is the Activities bar described above.
