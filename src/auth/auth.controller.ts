import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { User } from 'src/users/entities/users.entity';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  logIn(@Request() req: { user: User }) {
    return this.authService.logIn(req.user);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() createUserDto: CreateUsersDto) {
    return this.authService.register(createUserDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  refreshToken(@Request() req: { user: User }) {
    return this.authService.refreshToken(req.user);
  }
}
