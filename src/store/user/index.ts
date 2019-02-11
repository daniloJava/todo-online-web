import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { User } from '@/models';
import { AuthService } from '@/services';
import { Notification } from 'element-ui';

export enum Types {
  CLEAR = 'clear',
  INIT = 'init',
  INIT_SUCCESS = 'init_success',
  LOGOUT = 'logout',
  TOKEN_EXPIRED = 'token_expired',
  TOKEN_UPDATED = 'token_updated',
  UPDATE_TOKEN = 'update_token',

  FAILURE = 'failure',
}

export interface State {
  user: User;
  loading: boolean;
  error?: Error;
}


export const initialState: State = {
  user: new User(),
  loading: false,
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  user: (state) => state.user,
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.user = new User();
    state.error = undefined;
  },
  [Types.INIT](state: State) {
    state.loading = true;
  },
  [Types.INIT_SUCCESS](state: State, { model }) {
    state.loading = false;
    state.user = { ...model };
    state.error = undefined;
  },
  [Types.LOGOUT](state: State) {
    state.user = new User();
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
    Notification.error({
      title: 'Error',
      message: error.message,
    });
  },
} as MutationTree<State>;

export const actions = {
  async init(store: ActionContext<State, any>, { user }) {
    try {
      store.commit(Types.INIT);

      const model = await AuthService.insert(user).toPromise();
      store.commit(Types.INIT_SUCCESS, { model });

      return model;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

  async clear(store: ActionContext<State, any>): Promise<void> {
    store.commit(Types.CLEAR);
  },
} as ActionTree<State, any>;

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
