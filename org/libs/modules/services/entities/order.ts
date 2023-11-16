import { ICartItem } from "./cart";

export interface IOrder {
  id: string;
  orderSummary: ICartItem[] | null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  paymentMethod: string;
  status: string;
  shipping: number;
  tax: number;
  coupon: number;
}
