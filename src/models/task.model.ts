import { AbstractModel } from './abstract.model';
import { GroupTask } from './group-task.model';

export class Task extends AbstractModel<number> {
  public title!: string;
  public description!: string;
  public dateCreate!: Date;
  public dateUpdate!: Date;
  public status!: string;
  public group!: GroupTask;
}
