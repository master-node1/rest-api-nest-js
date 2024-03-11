import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async login(data: LoginDto) {
    const { email, password } = data;
    if (!email || !password) {
      throw 'error_invalid_data';
    }
    const user = await this.userService.getUserInfo(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.jwtService.sign(JSON.parse(JSON.stringify(user)));
      await this.cacheManager.set(`auth_user_${user._id}`, token);
      return { access_token: token };
    } else {
      throw 'error_invalid_credentials';
    }
  }
}
