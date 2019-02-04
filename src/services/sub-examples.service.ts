import { AbstractService } from '@/services';
import { SubExample } from '@/models';

export class SubExamplesService extends AbstractService<SubExample, string> {
  constructor() {
    super(`${AbstractService.baseUrl}/sub-examples`);
  }
}
