import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { Task, FilterTask, Page, Pageable, ResultList } from '@/models';
import { TaskService } from '@/services';

export enum Types {
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  filter: FilterTask;
  page: Page<Task>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  filter: new FilterTask(),
  page: new Page<Task>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  filter: (state) => state.filter,
  resultList: (state) => new ResultList<Task>(state.page, state.pageable, state.error),
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.QUERY](state: State, { filter, pageable }) {
    state.loading = true;
    state.filter = filter;
    state.pageable = { ...pageable };
    state.error = undefined;
  },
  [Types.QUERY_SUCCESS](state: State, { page }) {
    state.loading = false;
    state.page = { ...page };
    state.error = undefined;
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.error = undefined;
    state.page = new Page<Task>();
    state.pageable = new Pageable();
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FilterTask();
    state.error = undefined;
    state.page = new Page<Task>();
    state.pageable = new Pageable();
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async query(store: ActionContext<State, any>, { filter, pageable }) {
    try {
      store.commit(Types.QUERY, { filter, pageable });

      const page = await TaskService.query(filter, pageable).toPromise();
      if (page.isNotEmpty()) {
        store.commit(Types.QUERY_SUCCESS, { page });
      } else {
        store.commit(Types.NO_RESULT);
      }

      return page;
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
