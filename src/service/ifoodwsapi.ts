import axios, { AxiosRequestConfig } from 'axios';
import {
  getMerchantMenuRequest,
  getMerchantMenuResponse,
} from './ifoodapi.interface';

const {
  IFOODAPI_IFOODWS_API: WS_API_URL,
  IFOODAPI_SECRET_KEY: SECRET_KEY,
  IFOODAPI_ACCESS_KEY: ACCESS_KEY,
} = process.env;

export default class WsAPI {
  private static config: AxiosRequestConfig = {
    baseURL: WS_API_URL,
  };

  private static api = axios.create(WsAPI.config);

  static async getMerchantMenu({
    access_token,
    merchant_id,
  }: getMerchantMenuRequest): Promise<getMerchantMenuResponse> {
    const { data, status } = await this.api.get(
      `/ifood-ws-v3/v1/merchants/${merchant_id}/catalog`,
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
          'Comerciante não encontrado, valide o comerciante fornecido como argumento.';
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
