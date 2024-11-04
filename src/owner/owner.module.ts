import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { MysqlDBModule } from '../common/config/mysqlDB.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './schema/owner.schema';

@Module({
  imports: [MysqlDBModule, TypeOrmModule.forFeature([Owner])],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
