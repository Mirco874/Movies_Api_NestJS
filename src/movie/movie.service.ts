import { Injectable } from '@nestjs/common';
import { movies } from './data/movies';
import { CreateMovieDto } from './dto';
import { Movie } from './entities/movie.entity';

const savedMovies = movies;

@Injectable()
export class MovieService {
  findAll(): Movie[] {
    const movies: Movie[] = savedMovies;
    return movies;
  }

  persist(createMovieDto: CreateMovieDto): Movie {
    const calculatedId = savedMovies.length + 1;

    const newMovie = new Movie(
      calculatedId,
      createMovieDto.title,
      createMovieDto.category,
      createMovieDto.releaseYear,
    );

    savedMovies.push(newMovie);
    return newMovie;
  }
}
