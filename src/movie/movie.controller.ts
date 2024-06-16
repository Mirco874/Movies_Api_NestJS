import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieVo } from './vo';

@Controller('/api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    const movies = this.movieService.findAll();

    return movies.map(
      (movie) =>
        new MovieVo(movie.id, movie.title, movie.category, movie.releaseYear),
    );
  }
}
