import { sampleItemBaseChange } from './sample.base.mock';

export const sampleItemQtyChange = {
  ...sampleItemBaseChange,
  change: {
    index: 'Qty',
    value: 10,
  },
};
