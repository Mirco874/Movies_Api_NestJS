import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

const EMPTY_VALUE_MSG = "'Value' must not be empty";
const INVALID_VALUE_MSG =
  "'Value' must be greater than or equal to '0' and less than or equal to '5'";

export class AddRaitingDto {
  @IsNumber()
  @IsNotEmpty({ message: EMPTY_VALUE_MSG })
  @Min(1, { message: INVALID_VALUE_MSG })
  @Max(5, { message: INVALID_VALUE_MSG })
  value: number;
}
