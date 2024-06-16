export class MovieVo {
  id: number;
  title: string;
  category: string;
  releaseYear: number;
  constructor(
    id: number,
    title: string,
    category: string,
    releaseYear: number,
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.releaseYear = releaseYear;
  }
}
