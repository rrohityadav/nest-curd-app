import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseStatus } from '../../common/enum';
import { Owner } from '../../owner/schema/owner.schema';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('json', { nullable: true })
  info: {
    model: string;
    year: number;
    price: number;
    type: string;
  };
  @Column('simple-array')
  features: string[];

  @Column({
    type: 'enum',
    enum: BaseStatus,
    default: BaseStatus.active,
  })
  status: BaseStatus;
  // Many-to-one relation with Owner entity
  @ManyToOne(() => Owner, (owner) => owner.cars, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: Owner;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
