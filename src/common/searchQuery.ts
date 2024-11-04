import { SelectQueryBuilder } from 'typeorm';
import { Car } from '../car/schema/car.schema';
import { GetCarListDto } from './interface';

export const carSearchQuery = (
  queryBuilder: SelectQueryBuilder<Car>,
  input: GetCarListDto,
) => {
  if (input.type) {
    queryBuilder.andWhere("car.info->> '$.type' = :type", {
      type: input.type,
    });
  }
  if (input.year) {
    queryBuilder.andWhere("car.info->> '$.year' = :year", {
      year: input.year,
    });
  }
};
