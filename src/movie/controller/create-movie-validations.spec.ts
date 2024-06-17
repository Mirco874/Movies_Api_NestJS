import { plainToClass } from 'class-transformer';
import { CreateMovieDto } from '../dto';
import { validateSync } from 'class-validator';

describe('validations', () => {
  it('should return an error message when title sended is empty', () => {
    const createMovieDto = plainToClass(CreateMovieDto, {
      title: 'N0T v@l1d',
      category: 'Action',
      releaseYear: 1999,
    });

    const errors = validateSync(createMovieDto);
    expect(errors).toHaveLength(1);
  });

  it('should return an error message when category sended is not allowed', () => {
    const notAllowedCategory = 'Superheroes';

    const createMovieDto = plainToClass(CreateMovieDto, {
      title: 'Super Mario Bros',
      category: notAllowedCategory,
      releaseYear: 2023,
    });

    const errors = validateSync(createMovieDto);
    expect(errors).toHaveLength(1);
  });

  it('should return an error message release year is not between 1888 and 2024', () => {
    const invalidReleaseYear = 1500;

    const createMovieDto = plainToClass(CreateMovieDto, {
      title: 'Joker',
      category: 'Action',
      releaseYear: invalidReleaseYear,
    });

    const errors = validateSync(createMovieDto);
    expect(errors).toHaveLength(1);
  });
});
