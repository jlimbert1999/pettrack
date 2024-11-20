import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, ILike, Repository } from 'typeorm';

import { FilesService } from 'src/modules/files/files.service';
import { CreateOwnerDto, CreatePetDto, UpdateOwnerDto } from '../dtos';
import { PaginationParamsDto } from 'src/modules/common';
import { Owners, Pets } from '../entities';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
    @InjectRepository(Owners) private ownerRepository: Repository<Owners>,
    private fileService: FilesService,
  ) {}

  async create(petDto: CreatePetDto) {
    try {
      const { ownderId, ...props } = petDto;
      const owner = await this.ownerRepository.preload({ id: ownderId });
      if (!owner) {
        throw new BadRequestException('El propietario no existe');
      }
      const newPet = this.petRepository.create({ ...props, owner });
      const createdPet = await this.petRepository.save(newPet);
      return createdPet;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll({ limit, offset, term }: PaginationParamsDto) {
    // const [pets, length] = await this.petRepository.findAndCount({
    //   take: limit,
    //   skip: offset,
    //   relations: { owner: true },
    //   ...(term && {
    //     where: [{ owner: { dni: ILike(`%${term}%`) } }, ...(isNaN(Number(term)) ? [] : [{ code: Number(term) }])],
    //   }),
    //   order: {
    //     createdAt: 'DESC',
    //   },
    // });

    const query = this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.owner', 'owner')
      .take(limit)
      .skip(offset)
      .orderBy('pet.createdAt', 'DESC');

    if (term) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('owner.dni ILIKE :term', { term: `%${term}%` })
            .orWhere('pet.code = :code', { code: !isNaN(Number(term)) ? Number(term) : null })
            .orWhere(
              `CONCAT(owner.first_name, ' ', owner.middle_name, ' ', COALESCE(owner.last_name, '')) ILIKE :term`,
              { term: `%${term}%` },
            );
        }),
      );
    }
    const [pets, length] = await query.getManyAndCount();
    return { pets, length };
  }

  async getDetail(id: string) {
    console.log(id);
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
