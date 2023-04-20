import axios from 'axios';
import { CreateDeviceSession, FasterClientBuilder, SendEvents } from '../types';

export const create: FasterClientBuilder = config => {
  const api = axios.create({
    baseURL: config.url,
    headers: {
      'x-fstr-application-key': config.applicationKey,
    },
    validateStatus: () => true,
  });

  const createDeviceSession: CreateDeviceSession = async request => {
    const { status, data } = await api.post('/v1/device', request);

    return {
      statusCode: status,
      success: status === 201,
      description: data?.description,
    };
  };

  const dispatchEvent: SendEvents = async payload => {
    const { status, data } = await api.post('/v1/event', payload);

    return {
      statusCode: status,
      success: status === 200,
      description: data?.description,
    };
  };

  return {
    createDeviceSession,
    dispatchEvent,
  };
};
