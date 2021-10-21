export const sampleAfterSplitPackage = {
  vendorId: 'XXXX1',
  code_po: 'KPJ-12-10-00001-001',
  packages: [
    {
      code_package: 'KPJ-12-10-00001-001-001',
      items: [
        {
          productId: '1',
          quantity: 14,
          price: 10000,
        },
        {
          productId: '2',
          quantity: 14,
          price: 10000,
        },
      ],
      statuses: [],
    },
    {
      code_package: 'KPJ-12-10-00001-001-002',
      items: [
        {
          productId: '3',
          quantity: 14,
          price: 10000,
        },
      ],
      statuses: [],
    },
  ],
  statuses: [
    {
      name: 'NEW',
      timestamp: new Date('2021-10-10'),
    },
  ],
};
