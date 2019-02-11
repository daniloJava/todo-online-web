import { User } from '@/models';
import { AbstractService, insert, findBy } from '@/services';
import { Observable } from 'rxjs';
import Vue from 'vue';

export class AuthService extends AbstractService<User, number> {

  public static insert(user: User): Observable<User> {
    return insert(`${this.endpoint}/auth/signin`, user);
  }

  public static find(user: User): Observable<User> {
    return findBy(`${this.endpoint}/me`, user);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/task`;
  }

}

function normalizeFilter(filter: any): any {
  return {
    ...filter,
  };
}
