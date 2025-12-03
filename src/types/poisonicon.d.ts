declare module 'poisonicon/cog/stroke' {
  import { NullstackNode } from 'nullstack'
  export default function (_: {
    height: number
    title?: string
    animation?: 'spin'
    speed?: 'slow' | 'fast'
  }): NullstackNode
}
