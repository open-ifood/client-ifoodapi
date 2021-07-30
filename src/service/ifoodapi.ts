import {
  DefaultAuthRequest,
  getCustomerInformationResponse,
} from './ifoodapi.interface';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const { IFOODAPI_MARKETPLACE_API: MARKETPLACE_API_URL } = process.env;

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

export default class MarketplaceAPI {
  private static config: AxiosRequestConfig = {
    baseURL: MARKETPLACE_API_URL,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    validateStatus: () => true,
  };

  private static api = axios.create(MarketplaceAPI.config);

  private static mountAuthorization = (access_token: string) =>
    `Bearer ${access_token}`;

  private static handleResponse(statusCode: number, data?: any) {
    const success = statusCode >= 200 && statusCode <= 299;
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
        break;
    }

    return {
      success,
      message: success
        ? 'Operação realizada com sucesso'
        : message || 'Ocorreu um problema',
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
      ...this.handleResponse(status),
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
}
