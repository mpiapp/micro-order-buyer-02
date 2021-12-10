import { TStatus } from './../../../../config/type/status.type';

export type TStatusPackageLevel = {
  vendorId: string;
  packageId: string;
  status: TStatus;
};
