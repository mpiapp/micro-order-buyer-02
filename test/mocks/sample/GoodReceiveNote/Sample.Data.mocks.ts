import { sampleItem } from '../Products/sample.item.mock';

export const sampleGRN = {
  received: {
    code: 'GRN-001-001',
    date: new Date(),
    name: '1231212312412412312',
  },
  items: [
    {
      ...sampleItem,
      received: null,
    },
    {
      ...sampleItem,
      received: null,
    },
    {
      ...sampleItem,
      received: null,
    },
  ],
};
