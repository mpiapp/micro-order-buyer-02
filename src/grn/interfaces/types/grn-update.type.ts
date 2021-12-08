export type TGrnUpdate = {
  received: GRNReceived;
  items: {
    productId: string;
    quantity: number;
    received: number;
    price: number;
  }[];
};

export type GRNReceived = {
  code: string;
  date: Date;
  name: string;
};
