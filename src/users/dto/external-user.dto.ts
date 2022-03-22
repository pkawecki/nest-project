import { Role } from '../enums/roles.enum';

export interface ExternalUserDTO {
  name: string;
  surname: string;
  email: string;
  birthDate: number[];
  address: UserAddress;
  role: Role;
}

export interface UserAddress {
  country: string;
  city: string;
  street: string;
  street_address: string;
  apt_address: string;
}
