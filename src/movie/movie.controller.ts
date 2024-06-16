import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieVo } from './vo';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto';

@Controller('/api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(): Movie[] {
    const movies = this.movieService.findAll();

    return movies.map(
      (movie) =>
        new MovieVo(movie.id, movie.title, movie.category, movie.releaseYear),
    );
  }

  @Post()
  register(@Body() createMovieDto: CreateMovieDto): Movie {
    return this.movieService.persist(createMovieDto);
  }
}
