import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Owners, Pets } from '../pets-management/entities';
import { LoginOwnerDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtOwnerPayload } from './interfaces';
import { FilesService } from '../files/files.service';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owners) private ownerRepository: Repository<Owners>,
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
    private configService: ConfigService,
    private jwtService: JwtService,
    private fileService: FilesService,
  ) {}

  async login({ birthDate, dni }: LoginOwnerDto) {
    const owner = await this.ownerRepository.findOne({
      where: { dni, birthDate: Raw((alias) => `DATE(${alias}) = DATE(:date)`, { date: birthDate }) },
    });
    if (!owner) throw new BadRequestException('Sin registros para los datos ingresados');
    return { token: this.generateToken(owner), fullname: owner.fullname };
  }

  async getPets(owner: Owners) {
    const pets = await this.petRepository.find({ where: { owner: { id: owner.id } } });
    return pets.map((pet) => this._plainPet(pet));
  }

  async checkAuthStatus(ownerId: string) {
    const ownerDB = await this.ownerRepository.findOneBy({ id: ownerId });
    if (!ownerDB) throw new UnauthorizedException();
    const { fullname, address, phone, dni } = ownerDB;
    return { fullname, address, phone, dni };
  }

  private generateToken(owner: Owners): string {
    const payload: jwtOwnerPayload = {
      id: owner.id,
    };
    return this.jwtService.sign(payload);
  }

  private _plainPet(pet: Pets) {
    const { image, ...props } = pet;
    return {
      image: image ? this.fileService.buildFileUrl(image, 'pets') : null,
      ...props,
    };
  }
}
