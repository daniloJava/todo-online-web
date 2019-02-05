import _ from 'lodash';
import { Observable } from 'rxjs';
import Vue from 'vue';

import { HttpStatusEnum } from '@/enums';
import { AbstractModel, Page, Pageable } from '@/models';

export const insert = <T extends AbstractModel<ID>, ID>(endpoint: string, model: T): Observable<T> => {
  return Observable.create((observer: any) => {
    Vue.axios.post<T>(endpoint, model)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

export const update = <T extends AbstractModel<ID>, ID>(endpoint: string, model: T): Observable<T> => {
  return Observable.create((observer: any) => {
    Vue.axios.put<T>(`${endpoint}/${model.id}`, model)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

export const destroy = <ID>(endpoint: string, id: ID): Observable<void> => {
  return Observable.create((observer: any) => {
    Vue.axios.delete(`${endpoint}/${id}`)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

export const destroyBy = (endpoint: string, params: any): Observable<void> => {
  return Observable.create((observer: any) => {
    Vue.axios.delete(endpoint, { params })
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

export const destroyAll = (endpoint: string): Observable<void> => {
  return Observable.create((observer: any) => {
    Vue.axios.delete(endpoint)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};


export const findById = <T extends AbstractModel<ID>, ID>(endpoint: string, id: ID): Observable<T> => {
  return Observable.create((observer: any) => {
    Vue.axios.get<T>(`${endpoint}/${id}`)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

export const findBy = <T extends AbstractModel<ID>, ID>(endpoint: string, params: any): Observable<T> => {
  return Observable.create((observer: any) => {
    Vue.axios.get<T>(`${endpoint}`, { params: prepareParams(params) })
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

export const listAll = <T extends AbstractModel<ID> | string, ID>(endpoint: string): Observable<T[]> => {
  return Observable.create((observer: any) => {
    Vue.axios.get<T[]>(`${endpoint}`)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

export const listBy = <T extends AbstractModel<ID> | any, ID>(endpoint: string, params: any): Observable<T[]> => {
  return Observable.create((observer: any) => {
    Vue.axios.get<T[]>(`${endpoint}`, { params: prepareParams(params) })
      .then((response: any) => {
        observer.next(response.data.content);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

// tslint:disable-next-line:max-line-length
export const query = <T extends AbstractModel<ID>, ID>(endpoint: string, params: any, pageable: Pageable): Observable<Page<T>> => {
  return Observable.create((observer: any) => {
    Vue.axios.get<Page<T>>(`${endpoint}`, { params: prepareQueryRequest(params, pageable) })
      .then((response) => {
        observer.next(prepareQueryResponse(response));
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

export const download = <T extends AbstractModel<ID>, ID>(endpoint: string, params: any): Observable<T> => {
  return Observable.create((observer: any) => {
    Vue.axios.get<T>(`${endpoint}`, { params: prepareParams(params), responseType: 'arraybuffer' })
      .then((response: any) => {
        // tslint:disable-next-line:max-line-length
        if (HttpStatusEnum.CREATED !== response.status && HttpStatusEnum.OK !== response.status && response.data instanceof ArrayBuffer) {
          observer.error(new Error(new TextDecoder('UTF-8').decode(response.data)));

        } else {
          observer.next(response.data);
        }

        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
};

export abstract class AbstractService<T extends AbstractModel<ID>, ID> {
  public static baseUrl: string = process.env.VUE_APP_BASE_API as string;
  public static useJsonServer: boolean = !!process.env.VUE_APP_USE_JSON_SERVER as boolean;

  constructor(
    protected endpoint: string,
  ) {}

  public insert(model: T): Observable<T> {
    return insert(this.endpoint, model);
  }

  public update(model: T): Observable<T> {
    return update(this.endpoint, model);
  }

  public save(model: T): Observable<T> {
    return model.id ? this.update(model) : this.insert(model);
  }

  public delete(id: ID): Observable<void> {
    return destroy(this.endpoint, id);
  }

  public findById(id: ID): Observable<T> {
    return findById(this.endpoint, id);
  }

  public findBy(params: any): Observable<T> {
    return findBy(this.endpoint, params);
  }

  public listAll(): Observable<T[]> {
    return listAll(this.endpoint);
  }

  public listBy(params: any): Observable<T[]> {
    return listBy(this.endpoint, params);
  }

  public query(params: any, pageable: Pageable): Observable<Page<T>> {
    return query(this.endpoint, params, pageable);
  }

}

const prepareParams = (params: any) => {
  const normalized = _.pickBy(params, _.identity); // Remover campos null, undefined e array vazio

  const p: any = {
    ...normalized,
  };

  return p;
};

const prepareQueryRequest = (params: any, pageable: Pageable) => {
  const normalized = prepareParams(params);

  const p: any = AbstractService.useJsonServer ? {
    ...normalized,
    _limit: pageable.pageSize,
    _page: pageable.pageNumber,
  } : {
    ...normalized,
    page: pageable.pageNumber ? pageable.pageNumber - 1 : 0,
    size: pageable.pageSize}
  ;

  return p;
};

const prepareQueryResponse = <T>(response: any): Page<T> => {
  const count: number = +response.headers['x-total-count'];
  const data = response.data && response.data.content;

  return new Page(data as T[], count || response.data.totalElements);
};
