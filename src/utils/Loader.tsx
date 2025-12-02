import Nullstack, { NullstackClientContext } from 'nullstack'
import Cog from 'poisonicon/cog/stroke'
import './Loader.scss'

class Loader extends Nullstack {
  render({ worker, loading }: NullstackClientContext) {
    if (!worker.fetching && !loading) return false

    return (
      <div class="loading">
        <Cog height={50} />
      </div>
    )
  }
}

export default Loader
