import {
  failResponse,
  successSimpleResponse,
} from './../../middleware/handle-status-reponse';
import { Request, Response } from 'express';
import { MarketplaceAPI } from '../../service';

export default async (req: Request, res: Response) => {
  const { body } = req;
  const { address_line } = body;

  const has_address_line = address_line && address_line.length;

  if (!has_address_line) {
    return failResponse(res, {
      message: 'Linha de endereço (address_line) não informada',
    });
  }

  const geocode_response = await MarketplaceAPI.geocodeAddress({
    address_line,
  });

  return successSimpleResponse(res, geocode_response);
};
