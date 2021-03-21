import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  getRestaurantMenuRequest,
  getRestaurantMenuResponse,
} from './ifoodapi.interface';

const {
  IFOODAPI_MARKETPLACE_API: MARKETPLACE_API_URL,
  IFOODAPI_IFOODWS_API: WS_API_URL,
  IFOODAPI_SECRET_KEY: SECRET_KEY,
  IFOODAPI_ACCESS_KEY: ACCESS_KEY,
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

export class MarketplaceAPI {
  private static config: AxiosRequestConfig = {
    baseURL: MARKETPLACE_API_URL,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    validateStatus: () => true,
  };

  private static api = axios.create(MarketplaceAPI.config);

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

export class WsAPI {
  private static config: AxiosRequestConfig = {
    baseURL: WS_API_URL,
  };

  private static api = axios.create(WsAPI.config);

  static async getRestaurantMenu({
    access_token,
    restaurant_id,
  }: getRestaurantMenuRequest): Promise<getRestaurantMenuResponse> {
    const { data, status } = await this.api.get(
      `/ifood-ws-v3/v1/merchants/${restaurant_id}/catalog`,
      {
        headers: {
          authorization: access_token,
          secret_key: SECRET_KEY,
          access_key: ACCESS_KEY,
        },
      }
    );

    return {
      ...this.handleResponse(status, data),
      menu: data.data?.menu,
    };
  }

  private static handleResponse(statusCode: number, data?: any) {
    let message;
    const success =
      statusCode >= 200 && statusCode <= 299 && data?.code == '00';

    switch (data?.code) {
      case '102':
      case '103':
        message = 'Acesso negado, por favor verifique sua autorização';
        break;
      case '100':
        message =
          'Restaurante não encontrado, valide o restaurante passado como argumento.';
        break;
    }

    return {
      success,
      message: success
        ? 'Operação realizada com sucesso'
        : message || 'Ocorreu um problema',
    };
  }
}
