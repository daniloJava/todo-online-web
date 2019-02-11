import { Observable } from 'rxjs';

import {
  Page,
  Pageable,
  Task,
} from '@/models';
import { AbstractService, findById, query } from '@/services';

export class TaskService extends AbstractService<Task, number> {

  public static query(params: any, pageable: Pageable): Observable<Page<Task>> {
    return query(`${this.endpoint}`, normalizeFilter(params), pageable);
  }

  public static findById(id: number): Observable<Task> {
    return findById(this.endpoint, id);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/task/task`;
  }

  constructor() {
    super(`${AbstractService.baseUrl}/task/task`);
  }
}

function normalizeFilter(filter: any): any {
  return {
    ...filter,
  };
}
