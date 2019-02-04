import { AbstractService } from '@/services';
import { Example } from '@/models';

export class ExamplesService extends AbstractService<Example, string> {
  constructor() {
    super(`${AbstractService.baseUrl}/examples`);
  }
}
