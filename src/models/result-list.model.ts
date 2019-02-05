import { Page } from '@/models/page.model';
import { Pageable } from '@/models/pageable.model';

export class ResultList<T> {
  public static newInstance<T>(items: T[], pageNumber: number, pageSize: number): ResultList<T> {
    const offset = (pageNumber - 1) * pageSize;
    const data = items.slice(offset).slice(0, pageSize);
    const page = new Page(data, items.length);
    const pageable = new Pageable(pageNumber, pageSize);

    return new ResultList<T>(page, pageable);
  }

  constructor(
    public page: Page<T> = new Page(),
    public pageable: Pageable = new Pageable(),
    public error?: Error,
  ) {}

  public isEmpty(): boolean {
    return !this.page || !this.page.data || this.page.data.length <= 0;
  }

  public isNotEmpty(): boolean {
    return !this.isEmpty();
  }

  public position(index: number): number {
    const pageSize = this.pageable.pageSize || 0;
    const pageNumber = this.pageable.pageNumber || 0;

    return this.pageable ? (index + (pageSize * (pageNumber - 1) + 1)) : 0;
  }

  public count(): number {
    return this.page ? this.page.count : 0;
  }

}
