import { sampleItem } from '../Products/sample.item.mock';

export const sampleDeliveryNote = {
  id: expect.any(String),
  packageId: expect.any(String),
  code_po: 'DN-001-001',
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

export const sampleBuyer = {
  _id: '617364617364617364617344',
  name: 'Sample Buyer',
  address: 'sample address',
  phone: 'sample phone',
};

export const sampleVendor = {
  _id: '617364617364617364617344',
  name: 'Sample Vendor',
  address: 'sample address',
  phone: 'sample phone',
};

export const sampleAddress = {
  address: 'sample Address',
  zip_code: 422161,
  phone: 'sample phone',
};

export const sampleDelivery = {
  code: 'DN-001-001',
  despatch_date: new Date('2021-10-18T11:55:47.143+00:00'),
  awb: 'awb',
  method: 'method',
  shipping_address: sampleAddress,
};

export const sampleReference = {
  packageId: '617364617364617364617344',
  code_po: 'XXXXXXX',
  code_package: 'XXXXXXX',
  date_order: new Date('2021-10-18T11:55:47.143+00:00'),
};

export const sampleDeliveryNoteNew = {
  date: new Date('2021-10-18T11:55:47.143+00:00'),
  buyer: sampleBuyer,
  vendor: sampleVendor,
  items: [sampleItem, sampleItem],
  reference_doc: sampleReference,
  delivery: sampleDelivery,
  statuses: {
    name: 'on deliver',
    timestamp: new Date('2021-10-18T11:55:47.143+00:00'),
  },
  createdBy: '617364617364617364617344',
};

export const sampleDeliveryNoteControllerNew = {
  ...sampleDeliveryNoteNew,
  code_po: 'DN-001-001',
};
