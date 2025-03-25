import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Pets } from './pets.entity';
import { Users } from 'src/modules/users/entities';

@Entity('capture_logs')
export class CaptureLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  date: Date;

  @Column({ nullable: true })
  location: string | null;

  @Column()
  description: string;

  @ManyToOne(() => Pets, (pet) => pet.captures, { onDelete: 'CASCADE' })
  pet: Pets;

  @ManyToOne(() => Users, (user) => user.captures)
  user: Users;
}
