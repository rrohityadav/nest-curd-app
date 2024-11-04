import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from '../../car/schema/car.schema';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  // One-to-many relation with Car
  @OneToMany(() => Car, (car) => car.owner)
  cars: Car[];
}
