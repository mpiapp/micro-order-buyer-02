export const sampleDataCreatePO = {
  code: 'KPJ-12-10-00001',
  buyerId: '617364617364617364617344',
  date: new Date('2021-10-10'),
  addressId: '617364617364617364617344',
  vendors: [
    {
      code_po: 'KPJ-12-10-00001-001',
      vendorId: expect.any(String),
      packages: [
        {
          code_package: 'KPJ-12-10-00001-001-001',
          items: [
            {
              productId: expect.any(String),
              quantity: 14,
              price: 10000,
            },
            {
              productId: expect.any(String),
              quantity: 14,
              price: 10000,
            },
          ],
          statuses: [
            {
              name: 'Open',
              timestamp: new Date('2021-10-10 20:00'),
            },
          ],
        },
      ],
      payment_terms: null,
      tax: 100,
      statuses: [
        {
          name: 'Open',
          timestamp: new Date('2021-10-10 20:00'),
        },
      ],
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
