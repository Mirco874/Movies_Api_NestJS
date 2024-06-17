import { Injectable } from '@nestjs/common';
import { movies } from '../data/movies';
import { CreateMovieDto } from '../dto';
import { Movie } from '../entities/movie.entity';

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

  findById(id: number): Movie {
    const movie = savedMovies.find((movie) => movie.id === id);

    if (typeof movie === 'undefined') {
      return null;
    }
    return movie;
  }

  addRaiting(id: number, raitingValue: number): Movie {
    const findMovie: Movie = this.findById(id);

    if (!findMovie) {
      return null;
    }

    const rankingUpdated =
      findMovie.rateAverage * findMovie.voteCount + raitingValue;
    const voteCountUpdated = findMovie.voteCount + 1;

    findMovie.rateAverage = rankingUpdated / voteCountUpdated;
    findMovie.voteCount = voteCountUpdated;

    return findMovie;
  }
}
