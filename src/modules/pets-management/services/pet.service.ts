import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { Breeds } from 'src/modules/administration/entities';
import { CaptureLog, Owners, Pets } from '../entities';
import { Users } from 'src/modules/users/entities';

import { CaptureLogDto, CreatePetWithCaptureDto, FilterPetsDto } from '../dtos';
import { FilesService } from 'src/modules/files/files.service';
import { PaginationParamsDto } from 'src/modules/common';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
    @InjectRepository(Breeds) private breedRepository: Repository<Breeds>,
    @InjectRepository(CaptureLog) private captureLogRepository: Repository<CaptureLog>,
    private fileService: FilesService,
  ) {}

  // * Review after update
  async create({ pet, log }: CreatePetWithCaptureDto, user: Users) {
    const { breedId, ...props } = pet;
    const model = this.petRepository.create({
      ...props,
      captures: [this.captureLogRepository.create({ ...log, user: user })],
      breed: await this.breedRepository.preload({ id: breedId }),
    });
    const createdPet = await this.petRepository.save(model);
  }

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
    return { pets: pets.map((pet) => this.plainPet(pet)), length };
  }

  async getDetail(id: string) {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: { owner: true, treatments: { typeTreatment: true, medicalCenter: true } },
    });
    if (!pet) throw new NotFoundException(`Pet ${id} don't exist`);
    return this.plainPet(pet);
  }

  async createCaptureLog(petId: string, data: CaptureLogDto, currentUser: Users) {
    const pet = await this.petRepository.preload({ id: petId });
    const model = this.captureLogRepository.create({ ...data, pet, user: currentUser });
    const { user, ...props } = await this.captureLogRepository.save(model);
    return { ...props, user: { fullname: user.fullname } };
  }

  async removeCaptureLog(id: number) {
    await this.captureLogRepository.delete({ id });
    return { message: 'Capture log removed' };
  }

  async getCaptureLogs(id: string, { limit, offset }: PaginationParamsDto) {
    return await this.captureLogRepository.find({
      where: { pet: { id } },
      skip: offset,
      take: limit,
      order: { date: 'DESC' },
      relations: { user: true },
      select: {
        user: { fullname: true },
      },
    });
  }

  private plainPet(pet: Pets) {
    const { image, ...props } = pet;
    return {
      image: image ? this.fileService.buildFileUrl(image, 'pets') : null,
      ...props,
    };
  }
}
