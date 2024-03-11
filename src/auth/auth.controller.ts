import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() data: any) {
    try {
      return await this.authService.login(data);
    } catch (error) {
      console.error(error);
      switch (error) {
        case 'error_invalid_credentials':
          throw new UnauthorizedException(error);
        default:
          throw new BadRequestException(error);
      }
    }
  }
}
