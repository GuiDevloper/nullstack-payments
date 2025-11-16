declare module 'poisonicon/cog/stroke' {
  import { NullstackNode } from 'nullstack'
  export default function (_: {
    height: number
    animation?: 'spin'
    speed?: 'slow'
  }): NullstackNode
}
