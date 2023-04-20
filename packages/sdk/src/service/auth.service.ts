import { AxiosRequestConfig } from 'axios';
import { v4 } from 'uuid';
import { create } from '@open-ifood/faster-sdk';
import moment from 'moment';

const {
  IFOODAPI_MARKETPLACE_API: MARKETPLACE_API_URL,
  MARKETPLACE_APPLICATION_KEY: applicationKey,
  IFOODAPI_FASTER_APP_KEY: fasterApplicationKey,
  IFOODAPI_FASTER_URL: fasterUrl,
} = process.env;

export const headers = {
  deviceId: v4(),
  sessionId: v4(),
};

export const assertNotEmpty = (
  messageWhenEmpty: string,
  value?: string
): string => {
  const isEmpty = (value?: string) => {
    return !value || value.length === 0;
  };

  if (isEmpty(value)) {
    throw new Error(messageWhenEmpty);
  }

  return value || 'DEFAULT';
};

export const faster = create({
  applicationKey: assertNotEmpty(
    'Failed generating auth config, IFOODAPI_FASTER_APP_KEY must be specified in envs.',
    fasterApplicationKey
  ),
  url: assertNotEmpty(
    'Failed generating auth config, IFOODAPI_FASTER_URL must be specified in envs.',
    fasterUrl
  ),
});

export const generatePreCheckEmailConfirmation = (email: string) => {
  const date = moment().format();

  faster.dispatchEvent({
    deviceId: headers.deviceId,
    sessionId: headers.sessionId,
    ntpsentAt: date,
    sentAt: date,
    events: [
      {
        eventId: v4(),
        eventType: 'view_auth_otp_code',
        dimensions: {
          authType: 'email',
          accessPoint: 'viewAuthenticateEmail',
          authTypeValue: email.toUpperCase(),
        },
        eventTypeRevision: 4,
        localTimestamp: date,
        ntpLocalTimestamp: date,
      },
      {
        eventId: v4(),
        eventType: 'view_auth_otp_code',
        dimensions: {
          authType: 'e-mail',
          accessPoint: 'viewAuthenticateEmail',
          authTypeValue: email.toUpperCase(),
        },
        eventTypeRevision: 4,
        localTimestamp: date,
        ntpLocalTimestamp: date,
      },
    ],
  });
};

export const generateAuthConfig = (): AxiosRequestConfig => {
  faster.createDeviceSession({
    ...headers,
    appVersion: '999',
    deviceProperties: {
      browserName: 'Embedded',
      browserVersion: 'v1.5.2',
    },
    language: 'pt-BR',
    localTimestamp: '',
    platform: 'WEB',
    sdkVersion: '1.0.0',
    sentAt: '',
    system: 'Linux',
    systemVersion: '1',
    timezone: 'GMT-0300',
    trackInstall: true,
  });

  return {
    baseURL: MARKETPLACE_API_URL,
    headers: {
      'content-type': 'application/json',
      'x-ifood-device-id': headers.deviceId,
      'x-ifood-session-id': headers.sessionId,
      'x-client-application-key': applicationKey,
    },
    validateStatus: () => true,
  };
};
