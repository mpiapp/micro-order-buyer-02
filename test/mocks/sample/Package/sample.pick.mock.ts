const sampleItemPackage = {
  productId: expect.any(String),
  vendorId: expect.any(String),
  vendor_name: 'Heaney - Lind',
  name: 'Handmade Frozen Sausages',
  sku: 'LSNDKSH2123123',
  slug: 'product-abd-101',
  brand: 'Wine',
  images_product: 'https://agweasfasd.com',
  storage: {
    rack: 2,
    bin: 3,
    level: 4,
  },
  dimension: {
    width: 23,
    length: 23,
    height: 23,
    weight: 23,
  },
  sub_products: {
    sub_product_id: expect.any(String),
    slug: expect.any(String),
    variance: '123',
    image_sub_product: expect.any(String),
    made_date: new Date('2021-10-10'),
    expired_date: new Date('2021-10-10'),
    quantity: 12,
  },
  categories: 'testing',
  measurement: 'pcs',
  author: 'Rokujima',
  warehouse: {
    name: 'name warehouse',
    long: '-0,9012312381',
    lat: '6,123102371298',
  },
  price: 120000,
  quantity: 12,
  payment_term: [
    {
      name: 'Test',
      value: 12,
    },
  ],
  suggest_sub_price: 20000,
  suggest_quantity: 3,
  updated: false,
};

export const samplePickPackPackage = {
  id: expect.any(String),
  vendorId: expect.any(String),
  code_po: 'KPJ-12-10-00001-001',
  items: [sampleItemPackage, sampleItemPackage],
  statuses: {
    name: 'PICK',
    timestamp: new Date('2021-10-10'),
  },
};
