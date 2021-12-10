import { OrdersModules } from '../orders';
import { DeliveryNoteModule } from './delivery-note/delivery-note.module';
import { GrnModule } from './grn/grn.module';
import { PackageModule } from './package/package.module';

export const FulfilmentModules = [
  DeliveryNoteModule,
  GrnModule,
  PackageModule,
  OrdersModules,
];
