export class Page<T> {
  public static newInstance<T>(items: T[], pageNumber: number, pageSize: number): Page<T> {
    const offset = (pageNumber - 1) * pageSize;
    const data = items.slice(offset).slice(0, pageSize);

    return new Page(data, items.length);
  }

  constructor(
    public data: T[] = [],
    public count: number = 0,
  ) {}

  public isNotEmpty(): boolean {
    return this.data && this.data.length > 0;
  }

  public isEmpty(): boolean {
    return !this.isNotEmpty();
  }

}
