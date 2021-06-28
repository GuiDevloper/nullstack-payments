import Nullstack from 'nullstack';
import Cog from 'poisonicon/cog/stroke';
import './Loader.scss';

class Loader extends Nullstack {

  render({ loading }) {
    if (!loading) return false;

    return (
      <div class="loading">
        <Cog animation="spin" speed="slow" height={50} />
      </div>
    )
  }

}

export default Loader;