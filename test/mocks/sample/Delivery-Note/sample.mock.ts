import { sampleItem } from '../Products/sample.item.mock';

export const sampleDeliveryNote = {
  id: expect.any(String),
  code_delivery_note: 'DN-001-001',
  buyerId: '617364617364617364617344',
  addressId: '617364617364617364617344',
  date: new Date('2021-10-18T11:55:47.143+00:00'),
  orderId: '616d6345deda3dcd381ba42e',
  vendorId: '616d6345deda3dcd381ba42e',
  items: [sampleItem, sampleItem],
  statuses: {
    name: 'on deliver',
    timestamp: new Date('2021-10-18T11:55:47.143+00:00'),
  },
  createdBy: '617364617364617364617344',
};
