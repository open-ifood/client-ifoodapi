import {
  BROWSER_IFOOD,
  IFOOD_WEB_PRODUCT,
  IFOOD_DESKTOP_PLATAFORM,
  IFOOD_MEDIUM,
} from './../util/constants-util';
import axios, { AxiosRequestConfig } from 'axios';
import {
  getMerchantMenuRequest,
  getMerchantMenuResponse,
  NewOrderRequest,
  NewOrderResponse,
} from './ifoodapi.interface';

const {
  IFOODAPI_IFOODWS_API: WS_API_URL,
  IFOODAPI_SECRET_KEY: SECRET_KEY,
  IFOODAPI_ACCESS_KEY: ACCESS_KEY,
} = process.env;

export default class WsAPI {
  private static config: AxiosRequestConfig = {
    baseURL: WS_API_URL,
    validateStatus: () => true,
  };

  private static api = axios.create(WsAPI.config);

  static async makeOrder({
    access_token,
    address_id,
    scheduled,
    test,
    restaurantOrder,
    deliveryMethod,
    paymentSources,
  }: NewOrderRequest): Promise<NewOrderResponse> {
    const { data, status } = await this.api.post(
      '/ifood-ws-v3/v6/order/checkout',
      {
        browser: BROWSER_IFOOD,
        product: IFOOD_WEB_PRODUCT,
        plataform: IFOOD_DESKTOP_PLATAFORM,
        scheduled,
        test,
        medium: IFOOD_MEDIUM,
        address: {
          addressId: address_id,
        },
        restaurantOrder,
        deliveryMethod,
        paymentSources,
      },
      {
        headers: {
          authorization: `Bearer ${access_token}`,
          access_key: ACCESS_KEY,
          secret_key: SECRET_KEY,
        },
      }
    );

    const { data: orderData } = data;

    return {
      ...this.handleResponse(status, data),
      ...orderData,
    };
  }

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

    switch (statusCode) {
      case 401:
        message = 'Problema com autenticação';
        break;
    }

    if (data.message) {
      message = data.message;
    }

    return {
      success,
      message: success
        ? 'Operação realizada com sucesso'
        : message || 'Ocorreu um problema',
    };
  }
}
