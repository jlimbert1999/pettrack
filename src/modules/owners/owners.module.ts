import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { PetsManagementModule } from '../pets-management/pets-management.module';
import { AuthModule } from '../auth/auth.module';
import { JwtOwnerStrategy } from './jwt-owner.strategy';

@Module({
  controllers: [OwnersController],
  providers: [OwnersService, JwtOwnerStrategy],
  imports: [PetsManagementModule, AuthModule],
})
export class OwnersModule {}
