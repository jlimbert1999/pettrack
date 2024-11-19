import { Vaccinations } from 'src/modules/pets-management/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VaccineTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Vaccinations, (vaccination) => vaccination.vaccine_type)
  vaccinations: Vaccinations[];
}
