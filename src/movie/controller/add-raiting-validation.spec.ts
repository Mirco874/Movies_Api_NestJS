import { plainToClass } from 'class-transformer';
import { AddRaitingDto } from '../dto';
import { validateSync } from 'class-validator';

describe('add raiting validations', () => {
  it('should return an error message when tries to add a rate less than 1', () => {
    const addRaitingDto = plainToClass(AddRaitingDto, {
      value: 0,
    });

    const errors = validateSync(addRaitingDto);
    expect(errors).toHaveLength(1);
  });

  it('should return an error message when tries to add a rate greater than 5', () => {
    const addRaitingDto = plainToClass(AddRaitingDto, {
      value: 6,
    });

    const errors = validateSync(addRaitingDto);
    expect(errors).toHaveLength(1);
  });

  it('should return an error message when tries to add a rate value null', () => {
    const addRaitingDto = plainToClass(AddRaitingDto, {
      value: null,
    });

    const errors = validateSync(addRaitingDto);
    expect(errors).toHaveLength(1);
  });
});
