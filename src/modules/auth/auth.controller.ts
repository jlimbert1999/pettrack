import { Controller, Post, Body, Get, Patch, Param, ParseUUIDPipe } from '@nestjs/common';

import { Users } from 'src/modules/users/entities/user.entity';
import { UserService } from '../users/user.service';
import { Public, UserRequest } from './decorators';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { UpdateCreadentias } from '../users/dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post()
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Get()
  checkAuth(@UserRequest() user: Users) {
    return this.authService.checkAuthStatus(user.id);
  }

  @Patch('credentials/:userId')
  updateCredentials(@Param('userId', ParseUUIDPipe) userId: string, @Body() body: UpdateCreadentias) {
    return this.userService.updateCredentials(userId, body);
  }
}
