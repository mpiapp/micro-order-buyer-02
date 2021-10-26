export type TGrnUpdate = {
  grn_number: string;
  receivedUserId: string;
  items: {
    productId: string;
    quantity: number;
    received: number;
    price: number;
  }[];
};
