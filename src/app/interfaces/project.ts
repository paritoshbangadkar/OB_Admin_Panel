import { IBase } from "./base";

export interface IProject extends IBase {

  studentId: number;
  type: IProjectType;
  topic: string;
  abstract?: string;
  role?: string;
  aim: string;
  group?: string;
 
}

export enum IProjectType {
  MINI = "Mini",
  MEGA = "Mega",
}
