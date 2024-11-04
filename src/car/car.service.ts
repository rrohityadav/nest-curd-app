import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Car } from './schema/car.schema';
import {
  CreateCarDto,
  GetCarListDto,
  PaginatedResponse,
  UpdateBaseStatus,
  UpdateCarDto,
} from '../common/interface';
import { paginate } from 'nestjs-typeorm-paginate';
import { carSearchQuery } from '../common/searchQuery';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}
  async create(createCarDto: CreateCarDto): Promise<Car> {
    return this.carRepository.save(createCarDto);
  }

  async paginate(data: GetCarListDto): Promise<PaginatedResponse<Car>> {
    const queryBuilder = this.carRepository.createQueryBuilder('car');
    carSearchQuery(queryBuilder, data);
    return paginate<Car>(queryBuilder, data);
  }

  async findOne(id: number) {
    return await this.carRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<number> {
    const result = await this.carRepository.update(id, updateCarDto);
    return result.affected;
  }

  async addFeature(carId: number, feature: string): Promise<Car> {
    if (!feature || typeof feature !== 'string' || feature.trim() === '') {
      throw new BadRequestException('Feature must be a non-empty string');
    }
    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${carId} not found`);
    }
    // Check if the feature already exists in the features array
    if (!car.features.includes(feature)) {
      car.features.push(feature);
      await this.carRepository.save(car);
    }
    return car;
  }

  async removeFeature(carId: number, feature: string): Promise<Car> {
    if (!feature || typeof feature !== 'string' || feature.trim() === '') {
      throw new BadRequestException('Feature must be a non-empty string');
    }
    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${carId} not found`);
    }
    car.features = car.features.filter((f) => f !== feature);
    await this.carRepository.save(car);
    return car;
  }

  async updateStatus(data: UpdateBaseStatus): Promise<number> {
    const updateResult = await this.carRepository.update(
      { id: data.id },
      { status: data.status },
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Car with ID ${data.id} not found`);
    }
    return updateResult.affected;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.carRepository.delete(id);
    return { deleted: true };
  }
}
