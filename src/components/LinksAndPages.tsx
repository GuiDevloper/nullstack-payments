import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'
import { ROUTES } from '~/constants'
import './LinksAndPages.scss'

type LinkProps = (typeof ROUTES)[number]
declare function Link(c: LinkProps): NullstackNode
declare function Page(): NullstackNode

class Links extends Nullstack {
  renderLink({ url, name }: NullstackClientContext<LinkProps>) {
    return (
      <a
        href={url}
        class="link"
      >
        Pay with {name}
      </a>
    )
  }

  renderPage({ url, Component }: NullstackClientContext<LinkProps>) {
    return <Component route={url} />
  }

  render() {
    return (
      <>
        <div route="/">
          {ROUTES.map(R => (
            <Link {...R} />
          ))}
        </div>
        <>
          {ROUTES.map(R => (
            <Page {...R} />
          ))}
        </>
      </>
    )
  }
}

export default Links
