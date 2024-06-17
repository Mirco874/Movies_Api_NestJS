export class MovieVo {
  id: number;
  title: string;
  category: string;
  releaseYear: number;
  rateAverage: number;
  voteCount: number;

  constructor(
    id: number,
    title: string,
    category: string,
    releaseYear: number,
    rateAverage: number,
    voteCount: number,
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.releaseYear = releaseYear;
    this.rateAverage = rateAverage;
    this.voteCount = voteCount;
  }
}
