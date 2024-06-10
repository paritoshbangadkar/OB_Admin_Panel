import { IBase } from './base';

export interface IStudent extends IBase {
  collegeId: number;
  branchId: number;
  studentName: string;
  admissionYear?: string;
  enrollNo?: string;
  DOB: string;
  email: string;
  password?: string;
  mobile?: string;
  passingYear?: string;
  address?: string;
  languages?: string;
  image?: string;
}
