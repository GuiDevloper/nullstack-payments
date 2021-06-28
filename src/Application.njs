import Nullstack from 'nullstack';
import './Application.scss';
import StripePay from './StripePay';
import Loader from './utils/Loader';

class Application extends Nullstack {

  prepare({ page, project }) {
    page.locale = 'pt-BR';
    page.title = `${project.name} - Pagamentos com Nullstack!`;
    page.description = `${project.name} foi feito com Nullstack`;
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
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
        <StripePay />
        <Loader />
      </main>
    )
  }

}

export default Application;