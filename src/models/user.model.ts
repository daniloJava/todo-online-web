import { AbstractModel } from './abstract.model';

export class User extends AbstractModel<number> {
  public username!: string;
  public password!: string;
  public roles!: string[];
  public token!: string;
  public avatar!: string;
}
