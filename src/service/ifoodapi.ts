import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const { IFOODAPI_MARKETPLACE_API: MARKETPLACE_API_URL } = process.env;

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

export class MarketplaceAPI {
  static config: AxiosRequestConfig = {
    baseURL: MARKETPLACE_API_URL,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    validateStatus: () => true,
  };

  static api = axios.create(MarketplaceAPI.config);

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
      ...handleResponse(status),
      key: data.key,
    };
  }
}

const handleResponse = (statusCode: number) => {
  const defaultMessages: any = {
    '201': 'Operação realizada com sucesso',
  };

  return {
    success: statusCode >= 200 && statusCode <= 299,
    message: defaultMessages[statusCode.toString()],
  };
};
