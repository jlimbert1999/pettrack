import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PetsManagementModule } from '../pets-management/pets-management.module';
import { JwtOwnerStrategy } from './jwt-owner.strategy';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService, JwtOwnerStrategy],
  imports: [
    PassportModule.register({ property: 'owner' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('jwt_public_key'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PetsManagementModule,
    FilesModule,
  ],
})
export class OwnerPortalModule {}
