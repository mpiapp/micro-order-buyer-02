import { IStatus } from './../../../purchase-request/interfaces/type/IStatus.interface';
import { IPRItem } from './IPRItem.interface';

export interface IPRMove {
  code: string;
  date: Date;
  buyerId: string;
  addressId: string;
  items?: IPRItem[];
  total: number;
  statuses: IStatus[];
  createdBy: string;
}
