import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owners, Pets } from '../pets-management/entities';
import { LoginOwnerDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtOwnerPayload } from './interfaces';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owners) private ownerRepository: Repository<Owners>,
    @InjectRepository(Pets) private petRepository: Repository<Pets>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login({ birthDate, dni }: LoginOwnerDto) {
    const owner = await this.ownerRepository.findOne({ where: { dni, birthDate } });
    if (!owner) throw new BadRequestException('Las credenciales son invalidas');
    return { token: this._generateToken(owner) };
  }

  async getPets(owner: Owners) {
    return await this.petRepository.find({ where: { owner: { id: owner.id } } });
  }

  async checkAuthStatus(ownerId: string) {
    const ownerDB = await this.ownerRepository.findOneBy({ id: ownerId });
    if (!ownerDB) throw new UnauthorizedException();
    return { token: this._generateToken(ownerDB) };
  }

  private _generateToken(owner: Owners): string {
    const payload: jwtOwnerPayload = {
      id: owner.id,
    };
    return this.jwtService.sign(payload, { secret: this.configService.get('jwt_public_key') });
  }
}
