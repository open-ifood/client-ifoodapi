import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MessageConstants } from '../constants';
import {
  AddAddressRequest,
  AddAddressResponse,
  AuthRequest,
  AuthResponse,
  ConfirmTokenEmailRequest,
  ConfirmTokenEmailResponse,
  DefaultAuthRequest,
  GeocodeAddressRequest,
  GeocodeAddressResponse,
  GeocodeInput,
  GetAddressesResponse,
  getCustomerInformationResponse,
  GetMerchantPaymentMethodsRequest,
  GetMerchantPaymentMethodsResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SendTokenEmailRequest,
  SendTokenEmailResponse,
} from '../types/service/marketplace.service.interface';

const {
  IFOODAPI_MARKETPLACE_API: MARKETPLACE_API_URL,
  MARKETPLACE_APPLICATION_KEY,
} = process.env;

const apiConfig: AxiosRequestConfig = {
  baseURL: MARKETPLACE_API_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
  validateStatus: () => true,
};

const api: AxiosInstance = axios.create(apiConfig);

function mountAuthorization(access_token: string) {
  return `Bearer ${access_token}`;
}

function handleResponse(statusCode: number, data?: any) {
  const success =
    statusCode >= 200 &&
    statusCode <= 299 &&
    !MessageConstants.failureMessages.some(
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

  if (data?.message === MessageConstants.jwtTokenExpired) {
    message = MessageConstants.jwtTokenExpired;
  }

  return {
    success,
    message: success
      ? 'Operação realizada com sucesso'
      : message || 'Ocorreu um problema',
  };
}

function queryAddressLine(address_line: string): GeocodeInput {
  return {
    query: address_line,
  };
}

export async function getMerchantPaymentMethods({
  tags,
  merchantID,
}: GetMerchantPaymentMethodsRequest): Promise<GetMerchantPaymentMethodsResponse> {
  const params = new URLSearchParams();

  if (tags) {
    params.append('tags', tags);
  }

  const { data, status } = await api.get(
    `/v1/merchants/${merchantID}/payment-methods`,
    {
      params,
    }
  );

  return {
    ...handleResponse(status, data),
    paymentMethods: data,
  };
}

export async function getCustomerInformation({
  access_token,
}: DefaultAuthRequest): Promise<getCustomerInformationResponse> {
  const { data, status } = await api.get('/v1/customers/me', {
    headers: {
      authorization: mountAuthorization(access_token),
    },
  });

  const { account, tags } = data;

  return {
    ...handleResponse(status, data),
    account,
    tags,
  };
}

export async function sendTokenEmail({
  email,
}: SendTokenEmailRequest): Promise<SendTokenEmailResponse> {
  const { status, data }: AxiosResponse = await api.post(
    '/v1/identity-providers/OTP/authorization-codes',
    {
      tenant_id: 'IFO',
      email,
      type: 'EMAIL',
    }
  );

  return {
    ...handleResponse(status),
    key: data.key,
  };
}

export async function confirmTokenEmail({
  key,
  auth_code,
}: ConfirmTokenEmailRequest): Promise<ConfirmTokenEmailResponse> {
  const params: URLSearchParams = new URLSearchParams({
    key,
    auth_code: auth_code.toString(),
  });

  const { status, data } = await api.get(
    `/v1/identity-providers/OTP/access-tokens?${params.toString()}`
  );

  return {
    ...handleResponse(status, data),
    access_token: data.access_token,
  };
}

export async function auth({
  access_token: token,
  email,
}: AuthRequest): Promise<AuthResponse> {
  const { status, data } = await api.post(
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
    ...handleResponse(status, data),
    access_token,
    account_id,
    authenticated,
    refresh_token,
  };
}

export async function refreshToken({
  refresh_token,
}: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  const { status, data } = await api.post('/v2/access_tokens', {
    refresh_token,
  });

  return {
    ...handleResponse(status, data),
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };
}

export async function addAddress({
  access_token,
  address,
}: AddAddressRequest): Promise<AddAddressResponse> {
  const { status, data } = await api.post(
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

  return {
    ...handleResponse(status, data),
    ...data,
  };
}

export async function getAddresses({
  access_token,
}: DefaultAuthRequest): Promise<GetAddressesResponse> {
  const { status, data } = await api.get('/v1/customers/me/addresses', {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });

  return {
    ...handleResponse(status, data),
    addresses: data,
  };
}

export async function geocodeAddress({
  address_line,
}: GeocodeAddressRequest): Promise<GeocodeAddressResponse> {
  const { status, data } = await api.get('/v1/addresses:geocode', {
    params: queryAddressLine(address_line),
    headers: {
      'x-application-key': MARKETPLACE_APPLICATION_KEY,
    },
  });

  return {
    ...handleResponse(status, data),
    ...data,
  };
}
