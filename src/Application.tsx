import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack'
import './Application.scss'
import LinksAndPages from './utils/LinksAndPages'
import Loading from './utils/Loading'

declare function Head(): NullstackNode

class Application extends Nullstack {
  prepare({ page, project }: NullstackClientContext) {
    page.locale = 'pt-BR'
    page.title = `${project.name} - Pagamentos com Nullstack!`
    page.description = `${project.name} foi feito com Nullstack`
  }

  renderHead() {
    return (
      <head>
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </head>
    )
  }

  render() {
    return (
      <main>
        <Head />
        <Loading />
        <LinksAndPages />
      </main>
    )
  }
}

export default Application
