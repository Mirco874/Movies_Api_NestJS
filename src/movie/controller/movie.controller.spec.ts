import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from '../service/movie.service';
import { movies } from '../data/movies';
import { CreateMovieDto } from '../dto';

describe('MovieController', () => {
  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('movies controller', () => {
  let movieService: MovieService;
  let movieController: MovieController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    }).compile();
    movieService = moduleRef.get<MovieService>(MovieService);
    movieController = moduleRef.get<MovieController>(MovieController);
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      // Arrange
      const savedMovies = movies;
      jest.spyOn(movieService, 'findAll').mockImplementation(() => savedMovies);

      // Act
      const endpointMovies = await movieController.findAll();

      // Assert
      expect(endpointMovies).toEqual(savedMovies);
    });
  });

  describe('persist', () => {
    it('should return the new movie created', async () => {
      // Arrange
      jest.spyOn(movieService, 'findAll').mockImplementation(() => []);

      const expectedMovieTitle = 'Deadpool';
      const expectedMovieCategory = 'Action';
      const expectedMovieReleaseYear = 2015;

      const createMovieDto = new CreateMovieDto();
      createMovieDto.title = expectedMovieTitle;
      createMovieDto.category = expectedMovieCategory;
      createMovieDto.releaseYear = expectedMovieReleaseYear;

      // Act
      const savedMovie = await movieController.register(createMovieDto);

      // Assert
      expect(savedMovie.title).toBe(expectedMovieTitle);
      expect(savedMovie.category).toBe(expectedMovieCategory);
      expect(savedMovie.releaseYear).toBe(expectedMovieReleaseYear);
    });
  });
});
