export const sampleDataCreatePR = {
  code: 'KPJ-12-10-00001',
  buyerId: '617364617364617364617344',
  date: new Date('2021-10-10'),
  addressId: '617364617364617364617344',
  items: [
    {
      vendorId: expect.any(String),
      productId: expect.any(String),
      quantity: 14,
      price: 10000,
    },
    {
      vendorId: expect.any(String),
      productId: expect.any(String),
      quantity: 14,
      price: 10000,
    },
  ],
  total: 0,
  statuses: [
    {
      name: 'Create',
      timestamp: new Date('2021-10-10 20:00'),
    },
    {
      name: 'Submit',
      timestamp: new Date('2021-10-10 20:00'),
    },
    {
      name: 'Approved',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
  createdBy: '615fc7256dce435b915538ec',
};
