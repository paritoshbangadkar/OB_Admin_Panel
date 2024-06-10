import { IBase } from './base';

export interface ISubject extends IBase {
  universityId: number;
  branchId: number;
  semesterId: number;
  code?: string;
  subjectName?: string;
  description?: string;
  type: ISubjectType;
}
export enum ISubjectType {
  THEORY = 'Theory',
  PRACTICAL = 'Practical',
}
