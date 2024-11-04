import { Injectable } from '@nestjs/common';
import { CreateOwnerDto, UpdateOwnerDto } from '../common/interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './schema/owner.schema';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {}
  create(createOwnerDto: CreateOwnerDto) {
    return this.ownerRepository.save(createOwnerDto);
  }

  async findAll() {
    return await this.ownerRepository.find();
  }

  async findOne(id: number) {
    return await this.ownerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCarDto: UpdateOwnerDto) {
    return await this.ownerRepository.update(id, updateCarDto);
  }

  async remove(id: number) {
    await this.ownerRepository.delete(id);
    return { deleted: true };
  }
}
