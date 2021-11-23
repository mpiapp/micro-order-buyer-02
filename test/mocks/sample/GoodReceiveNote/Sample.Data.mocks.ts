import { sampleItem } from '../Products/sample.item.mock';

export const sampleGRN = {
  grn_number: 'GRN-001-001',
  receivedUserId: '1231212312412412312',
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
