import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

@Injectable()
export abstract class ItemService<T> {
  constructor(private readonly model: Model<T>) {}

  private addQty(filters, UpdateQuery, Options) {
    return this.model.updateOne(
      filters as FilterQuery<T>,
      UpdateQuery as UpdateQuery<T>,
      Options,
    );
  }

  private addOrRemove(filters, UpdateQuery) {
    return this.model.updateOne(
      filters as FilterQuery<T>,
      UpdateQuery as UpdateQuery<T>,
    );
  }

  async addItem(
    filters: Partial<Record<string, unknown>>,
    UpdateQuery: Partial<Record<string, unknown>>,
  ): Promise<any> {
    return this.addOrRemove(filters, UpdateQuery);
  }

  async removeItem(
    filters: Partial<Record<keyof T, unknown>>,
    UpdateQuery: Partial<Record<string, unknown>>,
  ): Promise<any> {
    return this.addOrRemove(filters, UpdateQuery);
  }

  async findItem(filters: Partial<Record<string, unknown>>): Promise<T> {
    return this.model.findOne(filters as FilterQuery<T>);
  }
}
