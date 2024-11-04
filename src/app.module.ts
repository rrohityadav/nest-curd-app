import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './common/config/db.module';
import { UsersModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    CarModule,
    OwnerModule,
  ],
})
export class AppModule {}
