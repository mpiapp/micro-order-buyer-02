import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IncomingMessage } from './../../config/interfaces/Income.interface';
import { DefaultStatusDto } from './dto/DefaultStatus.dto';
import { ItemStatusDto } from './dto/ItemStatus.dto';
import { PackageStatusDto } from './dto/PackageSattus.dto';
import { VendorStatusDto } from './dto/VendorStatus.dto';
import { DeliveryNoteStatusService } from './services/delivery-note-status.service';
import { OrdersStatusService } from './services/orders-status.service';

@Controller('status')
export class StatusController {
  constructor(
    private readonly delivery: DeliveryNoteStatusService,
    private readonly orders: OrdersStatusService,
  ) {}

  @EventPattern('status.delivery.note.push')
  async deliveryStatusPush(
    @Payload() message: IncomingMessage<DefaultStatusDto>,
  ): Promise<any> {
    return this.delivery.pushStatus(message.value);
  }

  @EventPattern('status.orders.push')
  async orderStatusPush(
    @Payload() message: IncomingMessage<DefaultStatusDto>,
  ): Promise<any> {
    return this.orders.pushStatusOrder(message.value);
  }

  @EventPattern('status.vendor.push')
  async vendorStatusPush(
    @Payload() message: IncomingMessage<VendorStatusDto>,
  ): Promise<any> {
    return this.orders.pushStatusVendor(message.value);
  }

  @EventPattern('status.package.push')
  async packageStatusPush(
    @Payload() message: IncomingMessage<PackageStatusDto>,
  ): Promise<any> {
    return this.orders.pushStatusPackage(message.value);
  }

  @EventPattern('status.item.push')
  async itemStatusPush(
    @Payload() message: IncomingMessage<ItemStatusDto>,
  ): Promise<any> {
    return this.orders.pushStatusItem(message.value);
  }
}
