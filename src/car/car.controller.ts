import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CarService } from './car.service';
import {
  CreateCarDto,
  GetCarListDto,
  PaginatedResponse,
  UpdateBaseStatus,
  UpdateCarDto,
} from '../common/interface';
import { Car } from './schema/car.schema';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.create(createCarDto);
  }

  @Get()
  async cars(
    @Body()
    payload: GetCarListDto,
  ): Promise<PaginatedResponse<Car>> {
    return this.carService.paginate(payload);
  }

  @Get(':id')
  car(@Param('id') id: string): Promise<Car> {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<number> {
    return this.carService.update(+id, updateCarDto);
  }

  @Patch(':id/features')
  async addFeatureToCar(
    @Param('id') carId: number,
    @Body('feature') feature: string,
  ): Promise<Car> {
    return this.carService.addFeature(carId, feature);
  }

  @Delete(':id/features')
  async removeFeature(
    @Param('carId') carId: number,
    @Body('feature') feature: string,
  ): Promise<Car> {
    return this.carService.removeFeature(carId, feature);
  }

  @Put('/status')
  async updateStatus(
    @Body() updateStatusDto: UpdateBaseStatus,
  ): Promise<number> {
    return this.carService.updateStatus(updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.carService.remove(+id);
  }
}
