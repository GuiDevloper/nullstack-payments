import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'
import './Links.scss'
import { ROUTES } from './index'

type LinkProps = {
  url: string
  name: string
}

declare function Link(c: LinkProps): NullstackNode

class Links extends Nullstack {
  renderLink({ url, name }: NullstackClientContext<LinkProps>) {
    return <a href={url}> Pay with {name} </a>
  }

  render() {
    return (
      <div>
        {ROUTES.map(R => (
          <Link {...R} />
        ))}
      </div>
    )
  }
}

export default Links
