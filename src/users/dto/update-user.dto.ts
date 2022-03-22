import { Role } from '../enums/roles.enum';

export interface UpdateUserDTO {
  name?: string;
  surname?: string;
  email?: string;
  birthDate?: string;
  address?: UserAddress;
  role?: Role;
}

export interface UserAddress {
  country?: string;
  city?: string;
  street?: string;
  street_address?: string;
  apt_address?: string;
}
