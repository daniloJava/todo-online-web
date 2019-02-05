import { AbstractModel } from './abstract.model';

export class SubExample extends AbstractModel<string> {
  public id!: string;
  public label!: string;
  public value!: string;
}
