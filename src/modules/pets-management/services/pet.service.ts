import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { FilesService } from 'src/modules/files/files.service';
import { Breeds } from 'src/modules/administration/entities';
import { Owners, Pets } from '../entities';
import { FilterPetsDto } from '../dtos';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
    private fileService: FilesService,
  ) {}

  async findAll({ limit, offset, term, owner, district }: FilterPetsDto) {
    const query = this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.owner', 'owner')
      .leftJoinAndSelect('owner.district', 'district')
      .leftJoinAndSelect('pet.breed', 'breed')
      .take(limit)
      .skip(offset)
      .orderBy('pet.createdAt', 'DESC');

    if (term || owner || district) {
      query.andWhere(
        new Brackets((qb) => {
          if (term) {
            qb.where('pet.name ILIKE :term', { term: `%${term}%` }).orWhere('pet.code = :code', {
              code: !isNaN(Number(term)) ? Number(term) : null,
            });
          }
          if (owner) {
            qb.andWhere(
              new Brackets((subQb) => {
                subQb
                  .where('owner.dni ILIKE :owner', { owner: `%${owner}%` })
                  .orWhere(
                    `CONCAT(owner.first_name, ' ', owner.middle_name, ' ', COALESCE(owner.last_name, '')) ILIKE :owner`,
                    { owner: `%${owner}%` },
                  );
              }),
            );
          }
          if (district) {
            qb.andWhere('district.id = :district', { district });
          }
        }),
      );
    }
    const [pets, length] = await query.getManyAndCount();
    return { pets, length };
  }

  async getDetail(id: string) {
    const pet = await this.petRepository.findOne({ where: { id }, relations: { owner: true } });
    if (!pet) throw new BadRequestException(`Pet ${id} don't exist`);
    return this._plainPet(pet);
  }

  private _plainPet(pet: Pets) {
    const { image, ...props } = pet;
    return {
      image: image ? this.fileService.buildFileUrl(image, 'pets') : null,
      ...props,
    };
  }
}
