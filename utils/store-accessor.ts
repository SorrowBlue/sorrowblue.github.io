/* eslint-disable import/no-mutable-exports */
import { Store } from "vuex"
import { getModule } from "vuex-module-decorators"
import Qiita from "~/store/qiita"

let qiitaStore: Qiita

function initialiseStores(store: Store<any>): void {
  qiitaStore = getModule(Qiita, store)
}

export { initialiseStores, qiitaStore }
