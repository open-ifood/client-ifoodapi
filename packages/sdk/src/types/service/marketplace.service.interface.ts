import Account from '../model/account.interface';

export interface GetMerchantPaymentMethodsRequest {
  /** Filtered tags for serach by payment methods */
  tags?: string;

  merchantID: string;
}

export interface DefaultResponse {
  success: boolean;
  message?: string;
}

export interface SendTokenEmailResponse extends DefaultResponse {
  key: string;
}

export interface SendTokenEmailRequest {
  email: string;
}

export interface GetMerchantPaymentMethodsRequest {
  /** Filtered tags for serach by payment methods */
  tags?: string;

  merchantID: string;
}

export interface PaymentMethodType {
  name: 'OFFLINE' | 'ONLINE' | string;
  description: string;
}

export interface PaymentMethodMethod {
  name: string;
  description: string;
}

export interface PaymentMethod {
  /** uuid for payment method. */
  id: string;

  /** Friendly name */
  name: string;

  type: PaymentMethodType;

  method: PaymentMethodMethod;

  liability?: 'IFOOD' | string;
}

export interface GetMerchantPaymentMethodsResponse extends DefaultResponse {
  paymentMethods?: Array<PaymentMethod>;
}

export interface ConfirmTokenEmailRequest {
  key: string;
  auth_code: number;
}

export interface ConfirmTokenEmailResponse extends DefaultResponse {
  access_token: string;
}

export interface AuthRequest {
  access_token: string;
  email: string;
}

export interface AuthResponse extends DefaultResponse {
  authenticated: boolean;
  account_id: string;
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse extends DefaultResponse {
  access_token: string;
  refresh_token: string;
}

export interface GeocodeAddressRequest {
  /** Address written in one line, with all in that. */
  address_line: string;
}

export interface GeocodeRule {
  key:
    | 'city'
    | 'state'
    | 'country'
    | 'streetName'
    | 'streetNumber'
    | 'neighborhood'
    | 'coordinates'
    | 'postalCode'
    | 'complement'
    | 'reference'
    | string;
  localizedLabel: string;
  required: boolean;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface GeocodeInput {
  query: string;
}

type Country = 'BR' | string;
type State = 'SP' | string;

export interface GeocodeAddress {
  city: string;
  state: State;
  country: Country;
  streetName: string;
  streetNumber?: string;
  neighborhood: string;
  coordinates: Coordinate;
  postalCode: string;
}

type Provider = 'GOOGLE' | string;

export interface GeocodeAddressResponse {
  /** Geocoded addresses. */
  addresses?: Array<GeocodeAddress>;

  /** Applied rules for a good geocoded address. */
  rules?: Array<GeocodeRule>;

  /** Service provider used in geocode process */
  provider?: Provider;

  /** Possible error code. */
  code?: string;

  /** Description case some occurred errors.  */
  message?: string;
  localizedMessage?: string;
  details?: Array<string>;
}

export interface Address {
  /** Hash unique identification. */
  id?: string;

  /** Incremental unique identification. */
  externalId?: number;

  alias?: any;
  establishment?: any;
  favorite?: boolean;
  locationId?: any;

  coordinates: Coordinate;
  postalCode: string;
  country: Country;
  state: State;
  city: string;
  neighborhood: string;
  streetName: string;
  streetNumber?: string;
  complement?: any;
  reference?: any;

  /** Service provider that geocode the address. */
  provider: Provider;

  /** Date-string */
  createdAt?: string;
  updatedAt?: string;
}

export interface GetAddressesResponse extends DefaultResponse {
  addresses: Array<Address>;
}

export interface AddAddressRequest extends DefaultAuthRequest {
  address: Address;
}

export interface AddAddressResponse extends DefaultResponse, Address {}

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

export interface OrderItem {
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

export interface Restaurant {
  /** Unique identification for the restaurant */
  uuid: string;
}

export interface RestaurantOrder {
  items: Array<OrderItem>;
  restaurant: Restaurant;
}

export interface DeliveryMethod {
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

export interface PaymentMethod {
  /** Unique identification for a payment method. */
  id: string;
}

export interface PaymentAmount {
  value: number;
  currency: 'BRL' | string;
}

export interface PaymentSource {
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

export interface OrderCheckout {
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
