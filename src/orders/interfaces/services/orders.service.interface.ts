export interface IOrderService {
  getOrderById(id: string): Promise<any>;
  getOrders(vendorId: string, status: string): Promise<any>;
}
