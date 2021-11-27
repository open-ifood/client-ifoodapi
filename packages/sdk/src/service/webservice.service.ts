import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import {
  BROWSER_IFOOD,
  IFOOD_DESKTOP_PLATAFORM,
  IFOOD_MEDIUM,
  IFOOD_WEB_PRODUCT,
} from '../constants/utils.constants';
import {
  getMerchantMenuRequest,
  getMerchantMenuResponse,
  NewOrderRequest,
  NewOrderResponse,
} from '../types/service/marketplace.service.interface';
const {
  IFOODAPI_IFOODWS_API: WS_API_URL,
  IFOODAPI_SECRET_KEY: SECRET_KEY,
  IFOODAPI_ACCESS_KEY: ACCESS_KEY,
} = process.env;

const apiConfig: AxiosRequestConfig = {
  baseURL: WS_API_URL,
  validateStatus: () => true,
};

const api: AxiosInstance = axios.create(apiConfig);

export async function order({
  access_token,
  addressId,
  scheduled,
  test,
  restaurantOrder,
  deliveryMethod,
  paymentSources,
}: NewOrderRequest): Promise<NewOrderResponse> {
  const { data, status } = await api.post(
    '/ifood-ws-v3/v6/order/checkout',
    {
      browser: BROWSER_IFOOD,
      product: IFOOD_WEB_PRODUCT,
      plataform: IFOOD_DESKTOP_PLATAFORM,
      scheduled,
      test,
      medium: IFOOD_MEDIUM,
      address: {
        addressId,
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
    ...handleResponse(status, data),
    ...orderData,
  };
}

export async function getMerchantMenu({
  access_token,
  merchant_id,
}: getMerchantMenuRequest): Promise<getMerchantMenuResponse> {
  const { data, status } = await api.get(
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
    ...handleResponse(status, data),
    menu: data.data?.menu,
  };
}

function handleResponse(statusCode: number, data?: any) {
  let message;
  const success = statusCode >= 200 && statusCode <= 299 && data?.code == '00';

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
