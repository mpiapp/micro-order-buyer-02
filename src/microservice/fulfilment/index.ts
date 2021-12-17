import { DeliveryNoteModule } from './delivery-note/delivery-note.module';
import { GrnModule } from './grn/grn.module';
import { OrderModule } from './orders/orders.module';
import { PackageModule } from './package/package.module';

export const FulfillmentModules = [
  DeliveryNoteModule,
  GrnModule,
  PackageModule,
  OrderModule,
];
