import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

import tasks from './tasks';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const config: any = {
  strict: debug,
  modules: {
    tasks,
  },
};

export enum Types {
  CLEAR = 'clear',
}

export interface State {
  loading: boolean;
}

export default new Vuex.Store({
  ...config,
  actions: {
    async clear(store: ActionContext<State, any>): Promise<void> {
      for (const moduleName in config.modules) {
        if (config.modules[moduleName].actions.hasOwnProperty('clear')) {
          store.commit(`${moduleName}/${Types.CLEAR}`);
        }
      }
    },
  },
});
