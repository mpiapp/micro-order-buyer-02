export type TGrnUpdate = {
  code_good_received_note: string;
  receivedUserId: string;
  items: {
    productId: string;
    quantity: number;
    received: number;
    price: number;
  }[];
};
