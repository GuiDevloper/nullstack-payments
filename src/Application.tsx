import Nullstack from 'nullstack'
import './Application.scss'
import * as Components from './components'
import { Loader, Links, ROUTES } from './utils'

class Application extends Nullstack {
  prepare({ page, project }) {
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

  renderComponent({ name, url }) {
    const Comp = Components[name.split(' ').join('')]
    return <Comp route={url} />
  }

  render() {
    return (
      <main>
        <Head />
        <Links route="/" />
        <>
          {ROUTES.map(R => (
            <Component {...R} />
          ))}
        </>
        <Loader />
      </main>
    )
  }
}

export default Application
