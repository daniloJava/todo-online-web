import { AbstractModel } from './abstract.model';

export class Task extends AbstractModel<number> {
  public title!: string;
  public description!: string;
  public dateCreate!: Date;
  public dateUpdate!: Date;
  public status!: string;
}
