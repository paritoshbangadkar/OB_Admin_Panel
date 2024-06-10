import { IBase } from './base';

export interface IAddress extends IBase {
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export enum IUniversityType {
  REGULAR = 'Regular',
  DEEMED = 'Deemed',
}
