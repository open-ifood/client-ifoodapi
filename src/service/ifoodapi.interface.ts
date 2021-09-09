import Account from '../types/account';
import { DefaultResponse } from './ifoodapi';

export interface DefaultAuthRequest {
  access_token: string;
}

export interface getMerchantMenuRequest extends DefaultAuthRequest {
  merchant_id: string;
}

export interface getMerchantMenuResponse extends DefaultResponse {
  menu?: Array<any>;
}

export interface getCustomerInformationResponse extends DefaultResponse {
  account: Account;
  tags: Array<any>;
}

interface OrderItem {
  /** Unique id of product */
  code: string;
  /** Price of product (in checkout this must be avaliable) */
  unitPrice: number;
  /** Note to the restaurant about this item, like prepare observation */
  obs: string;
  /** Quantity of items */
  qty: number;
  tags: Array<any>;
  /** Options that the user can incrementally. */
  choices: Array<any>;
}

interface Restaurant {
  /** Unique identification for the restaurant */
  uuid: string;
}

interface RestaurantOrder {
  items: Array<OrderItem>;
  restaurant: Restaurant;
}

interface DeliveryMethod {
  /** Identification for the delivery method. */
  id: 'DEFAULT' | string;
  /** Used priority */
  priority?: 1 | number;
  /** Type of delivery method */
  type?: 'FIXED' | string;
  /** Value of delivery fee */
  value?: number;
  originalValue?: number;
}

interface PaymentMethod {
  /** Unique identification for a payment method. */
  id: string;
}

interface PaymentAmount {
  value: number;
  currency: 'BRL' | string;
}

interface PaymentSource {
  source: 'OFFLINE' | string;
  paymentMethod: PaymentMethod;
  amount: PaymentAmount;
}

export interface NewOrderRequest extends DefaultAuthRequest {
  /** Unique identification for the addresses to delivery */
  addressId: number;

  /** Orders made */
  restaurantOrder: Array<RestaurantOrder>;

  /** If the order is scheduled for other date/time */
  scheduled: boolean;

  /** If the order is a test */
  test: boolean;

  /** The delivery method chosen in order. */
  deliveryMethod: DeliveryMethod;

  paymentSources: {
    sources: Array<PaymentSource>;
  };
}

interface OrderCheckout {
  /** Unique identification of the order */
  id: string;
  number: number;
  /** Timestamp created at order date */
  date: number;
  /** Total order value */
  totalOrderValue: number;
  /** Estimated delivery time in minutes */
  estimatedDeliveryTime: number;
}

export interface NewOrderResponse extends DefaultResponse {
  orderCheckout: OrderCheckout;
}
