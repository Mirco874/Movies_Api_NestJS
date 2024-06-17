import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from '../service/movie.service';
import { MovieVo } from '../vo';
import { AddRaitingDto, CreateMovieDto } from '../dto';

@Controller('/api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(): MovieVo[] {
    const movies = this.movieService.findAll();

    return movies.map(
      (movie) =>
        new MovieVo(
          movie.id,
          movie.title,
          movie.category,
          movie.releaseYear,
          movie.rateAverage,
          movie.voteCount,
        ),
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
      savedMovie.rateAverage,
      savedMovie.voteCount,
    );
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    const findMovie = this.movieService.findById(id);

    if (!findMovie) {
      throw new NotFoundException('The request movie ID does not exist');
    }

    return new MovieVo(
      findMovie.id,
      findMovie.title,
      findMovie.category,
      findMovie.releaseYear,
      findMovie.rateAverage,
      findMovie.voteCount,
    );
  }

  @Post(':id/raiting')
  addRaiting(
    @Param('id', ParseIntPipe) id: number,
    @Body() addRaitingDto: AddRaitingDto,
  ) {
    const movie = this.movieService.addRaiting(id, addRaitingDto.value);

    if (!movie) {
      throw new NotFoundException('The request movie ID does not exist');
    }

    return new MovieVo(
      movie.id,
      movie.title,
      movie.category,
      movie.releaseYear,
      movie.rateAverage,
      movie.voteCount,
    );
  }
}
