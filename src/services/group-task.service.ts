import {
  GroupTask,
} from '@/models';
import { AbstractService } from '@/services';

export class GroupTaskService extends AbstractService<GroupTask, number> {

  constructor() {
    super(`${AbstractService.baseUrl}/task/group-tasks`);
  }
}
