import { Injectable } from '@nestjs/common';
import { Movie } from 'src/interface';
import { movies } from './data/movies';

const savedMovies = movies;

@Injectable()
export class MovieService {
  findAll() {
    const movies: Movie[] = savedMovies;
    return movies;
  }
}
