import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlDBModule } from '../common/config/mysqlDB.module';
import { Car } from './schema/car.schema';

@Module({
  imports: [MysqlDBModule, TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
