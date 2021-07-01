import Nullstack from 'nullstack';
import './Links.scss';
import { ROUTES } from './index';

class Links extends Nullstack {

  renderLink({ url, name }) {
    return <a href={url}> Pay with {name} </a>
  }

  render() {
    return (
      <div>
        {ROUTES.map(R => <Link {...R} />)}
      </div>
    )
  }

}

export default Links;