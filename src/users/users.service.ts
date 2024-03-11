import * as bcrypt from 'bcrypt';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/users.models';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    this.createDefaultUser({
      name: 'sateesh',
      email: 'admin@ott.com',
      password: 'password',
      role: 'admin',
    });
  }

  async createDefaultUser(data: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const userInfo = await this.userModel.findOne({ email: data.email });
    if (userInfo) {
      return userInfo;
    }
    const hashedPassword = await bcrypt.hash(data.password, salt);
    return await this.userModel.create({
      ...data,
      password: hashedPassword,
    });
  }

  async getUser(id) {
    return await this.userModel.findById(id).populate('role');
  }

  async getUserInfo(email) {
    return await this.userModel.findOne({ email: email });
  }
}
