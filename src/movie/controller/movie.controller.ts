import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { MovieService } from '../service/movie.service';
import { MovieVo } from '../vo';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto';

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
  register(@Body(ValidationPipe) createMovieDto: CreateMovieDto): MovieVo {
    const savedMovie = this.movieService.persist(createMovieDto);

    return new MovieVo(
      savedMovie.id,
      savedMovie.title,
      savedMovie.category,
      savedMovie.releaseYear,
    );
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    const findMovie = this.movieService.findById(id);

    if (!findMovie) {
      throw new NotFoundException(`There is not a registered movie with id: ${id}`);
    }

    return new MovieVo(
      findMovie.id,
      findMovie.title,
      findMovie.category,
      findMovie.releaseYear,
    );
  }
}
