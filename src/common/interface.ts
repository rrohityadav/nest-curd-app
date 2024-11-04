import { ObjectId } from 'mongoose';
import { Owner } from '../owner/schema/owner.schema';
import { BaseStatus } from './enum';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateBaseStatus {
  @IsNumber()
  id: number;

  @IsEnum(BaseStatus)
  status: BaseStatus;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
  };
}

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  age: number;
}
export class UpdateUserDto extends CreateUserDto {
  id: ObjectId;
}
export class CreateCarDto {
  info: {
    model: string;
    year: number;
    price: number;
    type: string;
  };
  features: string[];
  owner?: Owner;
}
export class GetCarListDto {
  page: number;
  limit: number;
  type?: string;
  year?: number;
}

export class UpdateCarDto extends CreateCarDto {
  id: number;
}
export class CreateOwnerDto {
  name: string;
  email: string;
}
export class UpdateOwnerDto extends CreateOwnerDto {
  id: number;
}
