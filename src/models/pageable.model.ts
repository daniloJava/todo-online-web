export class Pageable {
  constructor(public pageNumber: number = 1, public pageSize: number = 10) {}

  public position(index: number): number {
    return index + (this.pageSize * (this.pageNumber - 1) + 1);
  }
}
