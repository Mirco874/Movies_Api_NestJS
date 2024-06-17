import { IsNotEmpty, Matches, Max, MaxLength, Min } from 'class-validator';

const EMPTY_TITLE_MSG = "'Title' must not be empty";
const LARGE_TITLE_MSG = "The length of 'Title' must be 50 characters or fewer";
const INVALID_TITLE_FORMAT_MSG =
  "'Title' contains invalid characters. Only letters, numbers and spaces are allowed";

const EMPTY_CATEGORY_MSG = "'Category' must not be empty";
const NOT_ALLOWED_CATEGORY_MSG =
  "'Category' is not in the correct format. Only the following categories are allowed: Action, Science Fiction, Drama, Thriller, Horror and Comedy";

const EMPTY_RELEASE_YEAR_MSG = "'ReleaseYear' must not be empty";
const INVALID_RELEASE_YEAR_MSG =
  "'Release year' must be greater than or equal to '1888' and less than or equal to '2024'";

export class CreateMovieDto {
  @IsNotEmpty({ message: EMPTY_TITLE_MSG })
  @MaxLength(50, { message: LARGE_TITLE_MSG })
  @Matches(/^[a-zA-Z\s]+$/, { message: INVALID_TITLE_FORMAT_MSG })
  title: string;

  @IsNotEmpty({ message: EMPTY_CATEGORY_MSG })
  @Matches(
    new RegExp('^(Action|Science Fiction|Drama|Thriller|Horror|Comedy)$'),
    { message: NOT_ALLOWED_CATEGORY_MSG },
  )
  category: string;

  @IsNotEmpty({ message: EMPTY_RELEASE_YEAR_MSG })
  @Min(1888, { message: INVALID_RELEASE_YEAR_MSG })
  @Max(2024, { message: INVALID_RELEASE_YEAR_MSG })
  releaseYear: number;
}
