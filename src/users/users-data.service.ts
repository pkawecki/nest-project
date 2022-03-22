import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { nanoid } from 'nanoid';
import { Role } from './enums/roles.enum';
@Injectable()
export class UsersDataService {
  users: User[] = [
    {
      id: 'd6fOi',
      name: 'UserName 1',
      surname: 'UserSurname 1',
      email: 'UserEmail 1',
      birthDate: new Date('2022-03-14'),
      address: {
        country: 'Poland',
        city: 'Debica',
        street: 'Street1',
        street_address: '1',
        apt_address: 'apt1',
      },
      role: Role.ADMIN,
    },
  ];
  addUser(user: CreateUserDTO): User {
    console.log(user);
    const reqUser = {
      ...user,
      birthDate: new Date(user.birthDate),
      id: nanoid(5),
    };
    this.users.push(reqUser);
    return reqUser;
  }
  getUserByID(id: string) {
    console.log('GET', id);
    const searchedUser = this.users.filter((x) => x.id == id);
    return searchedUser;
  }
  getAllUsers() {
    return this.users;
  }
  updateUser(id: string, user: UpdateUserDTO) {
    const searchedUser = this.users.find((x) => x.id == id);
    const index = this.users.indexOf(searchedUser);
    const userKeys = Object.keys(searchedUser);
    for (const key of userKeys) {
      if (key !== 'address' && key !== 'birthDate') {
        if (user[key]) {
          searchedUser[key] = user[key];
        }
      } else {
        const addressKeys = Object.keys(user[key]);
        for (const addressKey of addressKeys) {
          if (user.address[addressKey]) {
            searchedUser.address[addressKey] = user.address[addressKey];
          }
        }
      }
    }
    searchedUser.birthDate = new Date(user.birthDate);
    this.users.splice(index, 1);
    this.users.push(searchedUser);
    return searchedUser;
  }

  deleteUserById(id: string): boolean {
    const initLength = this.users.length;
    this.users = this.users.filter((x) => x.id !== id);
    const finalLength = this.users.length;
    return initLength == finalLength + 1;
  }
}
