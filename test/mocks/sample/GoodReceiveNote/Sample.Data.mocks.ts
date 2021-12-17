import { sampleReference, sampleVendor } from '../Delivery-Note/sample.mock';
import { sampleItem } from '../Products/sample.item.mock';

export const sampleGRN = {
  received: {
    code: 'GRN-001-001',
    date: new Date(),
    name: '1231212312412412312',
  },
  reference_doc: sampleReference,
  vendor: sampleVendor,
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
