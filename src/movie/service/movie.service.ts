import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { movies } from '../data/movies';
import { CreateMovieDto } from '../dto';
import { Movie } from '../entities/movie.entity';
import { PrismaClient } from '@prisma/client';

const savedMovies = movies;

@Injectable()
export class MovieService extends PrismaClient implements OnModuleInit {

  logger = new Logger("MovieService");

  async onModuleInit() {
    await this.$connect();
    this.logger.log('MovieService initialized');
  }

  findAll(): Promise<Movie[]> {
    const movies = this.movie.findMany();
    return movies;
  }

  persist(createMovieDto: CreateMovieDto): Promise<Movie> {
    const savedMovie = this.movie.create({
      data: {
        title: createMovieDto.title,
        category: createMovieDto.category,
        releaseYear: createMovieDto.releaseYear,
        rateAverage: 0,
        voteCount: 0,
      },
    });

    return savedMovie;
  }

  findById(id: number): Promise<Movie> {
    return this.movie.findUnique({ 
      where: { id }
    })
  }

  async addRaiting(id: number, raitingValue: number): Promise<Movie> {
    const findMovie: Movie = await this.findById(id);

    if (!findMovie) {
      throw new Error('The request movie ID does not exist');
    }

    const rankingUpdated =findMovie.rateAverage * findMovie.voteCount + raitingValue;
    const voteCountUpdated = findMovie.voteCount + 1;

    const updatedMovie = this.movie.update({
      where: { id },
      data: {
        rateAverage: rankingUpdated / voteCountUpdated,
        voteCount: voteCountUpdated,
      },
    });

    return updatedMovie;
  }
}
