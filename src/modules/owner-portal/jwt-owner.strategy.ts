import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { Owners } from '../pets-management/entities';
import { jwtOwnerPayload } from './interfaces';

@Injectable()
export class JwtOwnerStrategy extends PassportStrategy(Strategy, 'jwt-owner') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Owners) private ownerRepository: Repository<Owners>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('jwt_public_key'),
    });
  }

  async validate(payload: jwtOwnerPayload) {
    const owner = await this.ownerRepository.findOne({ where: { id: payload.id } });
    if (!owner) throw new UnauthorizedException('Sesion invalida, vuelva a iniciar sesion');
    return owner;
  }
}
