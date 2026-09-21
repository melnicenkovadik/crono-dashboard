import amazon from '../assets/avatar-amazon-replies.png'
import mcdonalds from '../assets/avatar-mcdonalds.png'
import medium from '../assets/avatar-medium.png'
import reddit from '../assets/avatar-reddit.png'
import type { Replies } from './types'

export const replies: Replies = {
  count: 24,
  avatars: [
    { id: 'reddit', src: reddit, alt: 'Reddit' },
    { id: 'amazon', src: amazon, alt: 'Amazon' },
    { id: 'mcdonalds', src: mcdonalds, alt: "McDonald's" },
    { id: 'medium', src: medium, alt: 'Medium' },
  ],
}
