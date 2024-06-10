import { IBase } from './base';
import { IAddress } from './address';

export interface IUser extends IBase {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: IRole;
  mobile: string;
  status: string;
  address: IAddress;
  image: string;
  password: string;
  lastLoginAt: string;
  resetPin?: string;
  isFirstLogin?: string;
  isVerify?: boolean;
  count?: number;
}

export enum IRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  UNAPPROVED = 'unapproved',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DELETED = 'deleted',
}
