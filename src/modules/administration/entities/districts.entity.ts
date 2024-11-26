import { Owners } from 'src/modules/pets-management/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Districts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Owners, (owner) => owner.district)
  owners: Owners[];
}
