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
    return this.model.findOneAndUpdate(
      {
        $and: [
          {
            'vendors._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $set: {
          'vendors.$[array].proof_of_advance_payment.file.url': fileUrl,
          'vendors.$[array].proof_of_advance_payment.file.uploader': uploader,
          'vendors.$[array].proof_of_advance_payment.file.date': new Date(
            now(),
          ),
        },
      },
      {
        arrayFilters: [{ 'array._id': new mongoose.Types.ObjectId(id) }],
      },
    );
  }

  async approved(params: ApprovalOfPaymentDto) {
    const { id, name, nominal } = params;
    return this.model.findOneAndUpdate(
      {
        $and: [
          {
            'vendors._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $set: {
          'vendors.$[array].proof_of_advance_payment.approval.nominal': nominal,
          'vendors.$[array].proof_of_advance_payment.approval.name': name,
          'vendors.$[array].proof_of_advance_payment.approval.date': new Date(
            Date.now(),
          ),
        },
        $push: {
          'vendors.$[array].statuses': {
            name: 'Active',
            timestamp: new Date(Date.now()),
          },
        },
      },
      {
        arrayFilters: [{ 'array._id': new mongoose.Types.ObjectId(id) }],
      },
    );
  }

  async checking(id: string) {
    return this.model.find({
      $and: [
        { 'vendors._id': new mongoose.Types.ObjectId(id) },
        {
          'vendors.down_payment': { $exists: true },
        },
        {
          'vendors.proof_of_advance_payment.approval.name': { $exists: true },
        },
      ],
    });
  }
}
