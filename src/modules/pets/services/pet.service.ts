import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePetDto } from '../dtos';
import { Owners, Pets } from '../entities';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pets)
    private petRepository: Repository<Pets>,
    @InjectRepository(Owners)
    private ownerRepository: Repository<Owners>,
  ) {}

  create(petDto: CreatePetDto) {
    // try {
    //   const { pe, ...props } = petDto;
    //   const branch = this.branchRepository.create({
    //     ...props,
    //     services: await this.serviceRepository.find({
    //       where: { id: In(services) },
    //     }),
    //     videos: videos.map((video) =>
    //       this.branchVideoRepository.create({ url: video }),
    //     ),
    //   });
    //   const createdBranch = await this.branchRepository.save(branch);
    //   this.fileService.saveFiles(videos, 'branches');
    //   return this._plainBranch(createdBranch);
    // } catch (error) {
    //   console.log(error);
    //   throw new InternalServerErrorException();
    // }
  }
}
