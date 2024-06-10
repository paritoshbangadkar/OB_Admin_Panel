import { IBase } from './base';

export interface IUserDevice extends IBase {
  studentId: number;
  receiveNotification: boolean;
  deviceId?: string;
  uuId?: string;
  appVersion?: string;
  osVersion?: string;
  operatingSystem?: string;
  geoLocation?: string;
  model?: string;
  manufacturer?: string;
  phoneVerified: boolean;
}
