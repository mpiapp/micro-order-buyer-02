import { sampleItem } from '../Products/sample.item.mock';

export const samplePickPackPackage = {
  id: expect.any(String),
  vendorId: expect.any(String),
  code_po: 'KPJ-12-10-00001-001',
  items: [sampleItem, sampleItem],
  statuses: {
    name: 'PICK',
    timestamp: new Date('2021-10-10'),
  },
};
