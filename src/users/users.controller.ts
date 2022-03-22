import { UpdateUserDTO } from './dto/update-user.dto';
import { dateToArray } from './../shared/helpers/date.helper';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersDataService } from './users-data.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Post()
  addUser(@Body('user') user: CreateUserDTO): ExternalUserDTO {
    console.log('post');

    return this.mapUserToExternal(this.userRepository.addUser(user));
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userRepository.getUserByID(id);
  }

  @Get('')
  getAllUsers(): User[] {
    return this.userRepository.getAllUsers();
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body('user') user: UpdateUserDTO,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.updateUser(id, user));
  }

  @Delete(':id')
  //   @HttpCode(204)
  deleteUser(@Param('id') id: string): string {
    return this.userRepository.deleteUserById(id) ? 'removed' : 'not removed';
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return {
      ...user,
      birthDate: dateToArray(user.birthDate),
    };
  }
}
