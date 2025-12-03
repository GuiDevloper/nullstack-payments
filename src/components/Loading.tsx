import Nullstack, { NullstackClientContext } from 'nullstack'
import Cog from 'poisonicon/cog/stroke'
import './Loading.scss'

class Loading extends Nullstack {
  render({ worker, loading }: NullstackClientContext) {
    if (!worker.fetching && !loading) return false

    return (
      <div class="loading">
        <Cog height={50} />
      </div>
    )
  }
}

export default Loading
