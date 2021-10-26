import { sampleItemBaseChange } from './sample.base.mock';

export const sampleItemPriceChange = {
  ...sampleItemBaseChange,
  change: {
    index: 'Price',
    value: 10000,
  },
};
