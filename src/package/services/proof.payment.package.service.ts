import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Order, OrderDocument } from './../../database/schema/orders.schema';
import { ProofOfPaymentDto } from '../dto/Proof.Payment.dto';
import { now } from 'moment';
import { ApprovalOfPaymentDto } from '../dto/Approval.Payment.dto';

@Injectable()
export class ProofPaymentService {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
  ) {}

  async upload(params: ProofOfPaymentDto) {
    const { id, fileUrl, uploader } = params;
    return this.model.updateOne(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $set: {
          'vendors.$.packages.$.proof_of_advance_payment.file.url': fileUrl,
          'vendors.$.packages.$.proof_of_advance_payment.file.uploader':
            uploader,
          'vendors.$.packages.$.proof_of_advance_payment.file.date': new Date(
            now(),
          ),
        },
      },
    );
  }

  async approved(params: ApprovalOfPaymentDto) {
    const { id, name, nominal } = params;
    return this.model.updateOne(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $set: {
          'vendors.$.packages.$.proof_of_advance_payment.approval.nominal':
            nominal,
          'vendors.$.packages.$.proof_of_advance_payment.approval.name': name,
          'vendors.$.packages.$.proof_of_advance_payment.approval.date':
            new Date(now()),
        },
      },
    );
  }

  async checking(id: string) {
    return this.model.find({
      $and: [
        { 'vendors.packages._id': new mongoose.Types.ObjectId(id) },
        {
          'vendors.packages.down_payment': { $exists: true },
        },
        {
          'vendors.packages.approval.name': { $exists: true },
        },
      ],
    });
  }
}
