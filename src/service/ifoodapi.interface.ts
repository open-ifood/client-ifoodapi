import { DefaultResponse } from './ifoodapi';

export interface DefaultAuthRequest {
  access_token: string;
}

export interface getRestaurantMenuRequest extends DefaultAuthRequest {
  restaurant_id: string;
}

export interface getRestaurantMenuResponse extends DefaultResponse {
  menu?: Array<any>;
}
