import {
  DefaultAuthRequest,
  getCustomerInformationResponse,
} from './ifoodapi.interface';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const {
  IFOODAPI_MARKETPLACE_API: MARKETPLACE_API_URL,
  MARKETPLACE_APPLICATION_KEY,
} = process.env;

export interface DefaultResponse {
  success: boolean;
  message?: string;
}

interface SendTokenEmailResponse extends DefaultResponse {
  key: string;
}

interface SendTokenEmailRequest {
  email: string;
}

interface GetMerchantPaymentMethodsRequest {
  /** Filtered tags for serach by payment methods */
  tags?: string;

  merchantID: string;
}

interface PaymentMethodType {
  name: 'OFFLINE' | 'ONLINE' | string;
  description: string;
}

interface PaymentMethodMethod {
  name: string;
  description: string;
}

interface PaymentMethod {
  /** uuid for payment method. */
  id: string;

  /** Friendly name */
  name: string;

  type: PaymentMethodType;

  method: PaymentMethodMethod;

  liability?: 'IFOOD' | string;
}

interface GetMerchantPaymentMethodsResponse extends DefaultResponse {
  paymentMethods?: Array<PaymentMethod>;
}

interface ConfirmTokenEmailRequest {
  key: string;
  auth_code: number;
}

interface ConfirmTokenEmailResponse extends DefaultResponse {
  access_token: string;
}

interface AuthRequest {
  access_token: string;
  email: string;
}

interface AuthResponse extends DefaultResponse {
  authenticated: boolean;
  account_id: string;
  access_token: string;
  refresh_token: string;
}

interface RefreshTokenRequest {
  refresh_token: string;
}

interface RefreshTokenResponse extends DefaultResponse {
  access_token: string;
  refresh_token: string;
}

interface GeocodeAddressRequest {
  /** Address written in one line, with all in that. */
  address_line: string;
}

interface GeocodeRule {
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

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface GeocodeInput {
  query: string;
}

type Country = 'BR' | string;
type State = 'SP' | string;

interface GeocodeAddress {
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

interface GeocodeAddressResponse {
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

interface Address {
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

interface GetAddressesResponse extends DefaultResponse {
  addresses: Array<Address>;
}

interface AddAddressRequest extends DefaultAuthRequest {
  address: Address;
}

interface AddAddressResponse extends DefaultResponse, Address {}

export default class MarketplaceAPI {
  private static config: AxiosRequestConfig = {
    baseURL: MARKETPLACE_API_URL,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    validateStatus: () => true,
  };

  private static readonly MSG_TOKEN_EXPIRED = 'token expired';
  private static readonly MSG_NOT_FOUND_JWT_TOKEN = 'no jwt token';

  private static readonly FAILURE_MESSAGES = [
    MarketplaceAPI.MSG_NOT_FOUND_JWT_TOKEN,
    MarketplaceAPI.MSG_TOKEN_EXPIRED,
  ];

  private static api = axios.create(MarketplaceAPI.config);

  private static mountAuthorization = (access_token: string) =>
    `Bearer ${access_token}`;

  private static handleResponse(statusCode: number, data?: any) {
    const success =
      statusCode >= 200 &&
      statusCode <= 299 &&
      !MarketplaceAPI.FAILURE_MESSAGES.some(
        fail_message => fail_message === data?.message
      );
    let message;

    switch (data?.code) {
      case 'OTP-2001':
        message = 'Codigo de autenticação expirado ou inexistente';
        break;
      case 'OTP-2002':
        message = 'Código de autenticação inválido.';
        break;
      case 'IDT-2004':
        message = 'Usuario nao autenticado';
      case 'IFSL-2004':
        message = 'Acesso não permitido';
        break;
    }

    if (data?.message === this.MSG_TOKEN_EXPIRED) {
      message = this.MSG_TOKEN_EXPIRED;
    }

    return {
      success,
      message: success
        ? 'Operação realizada com sucesso'
        : message || 'Ocorreu um problema',
    };
  }

  static async getMerchantPaymentMethods({
    tags,
    merchantID,
  }: GetMerchantPaymentMethodsRequest): Promise<GetMerchantPaymentMethodsResponse> {
    const params = new URLSearchParams();

    if (tags) {
      params.append('tags', tags);
    }

    const { data, status } = await this.api.get(
      `/v1/merchants/${merchantID}/payment-methods`,
      {
        params,
      }
    );

    return {
      ...this.handleResponse(status, data),
      paymentMethods: data,
    };
  }

  static async getCustomerInformation({
    access_token,
  }: DefaultAuthRequest): Promise<getCustomerInformationResponse> {
    const { data, status } = await this.api.get('/v1/customers/me', {
      headers: {
        authorization: this.mountAuthorization(access_token),
      },
    });

    const { account, tags } = data;

    return {
      ...this.handleResponse(status, data),
      account,
      tags,
    };
  }

  static async sendTokenEmail({
    email,
  }: SendTokenEmailRequest): Promise<SendTokenEmailResponse> {
    const { status, data }: AxiosResponse = await this.api.post(
      '/v1/identity-providers/OTP/authorization-codes',
      {
        tenant_id: 'IFO',
        email,
        type: 'EMAIL',
      }
    );

    return {
      ...this.handleResponse(status),
      key: data.key,
    };
  }

  static async confirmTokenEmail({
    key,
    auth_code,
  }: ConfirmTokenEmailRequest): Promise<ConfirmTokenEmailResponse> {
    const params: URLSearchParams = new URLSearchParams({
      key,
      auth_code: auth_code.toString(),
    });

    const { status, data } = await this.api.get(
      `/v1/identity-providers/OTP/access-tokens?${params.toString()}`
    );

    return {
      ...this.handleResponse(status, data),
      access_token: data.access_token,
    };
  }

  static async auth({
    access_token: token,
    email,
  }: AuthRequest): Promise<AuthResponse> {
    const { status, data } = await this.api.post(
      '/v2/identity-providers/OTP/authentications',
      {
        tenant_id: 'IFO',
        device_id: '4d3094c24a96dfe4ecd65b53b8950ceb',
        token,
        email,
      }
    );

    const { access_token, account_id, authenticated, refresh_token } = data;

    return {
      ...this.handleResponse(status, data),
      access_token,
      account_id,
      authenticated,
      refresh_token,
    };
  }

  static async refreshToken({
    refresh_token,
  }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const { status, data } = await this.api.post('/v2/access_tokens', {
      refresh_token,
    });

    return {
      ...this.handleResponse(status, data),
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  }

  static async addAddress({
    access_token,
    address,
  }: AddAddressRequest): Promise<AddAddressResponse> {
    const { status, data } = await this.api.post(
      '/v1/customers/me/addresses',
      {
        ...address,
      },
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(data);

    return {
      ...this.handleResponse(status, data),
      ...data,
    };
  }

  static async getAddresses({
    access_token,
  }: DefaultAuthRequest): Promise<GetAddressesResponse> {
    const { status, data } = await this.api.get('/v1/customers/me/addresses', {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    return {
      ...this.handleResponse(status, data),
      addresses: data,
    };
  }

  static async geocodeAddress({
    address_line,
  }: GeocodeAddressRequest): Promise<GeocodeAddressResponse> {
    const { status, data } = await this.api.get('/v1/addresses:geocode', {
      params: this.queryAddressLine(address_line),
      headers: {
        'x-application-key': MARKETPLACE_APPLICATION_KEY,
      },
    });

    return {
      ...this.handleResponse(status, data),
      ...data,
    };
  }

  private static queryAddressLine(address_line: string): GeocodeInput {
    return {
      query: address_line,
    };
  }
}
