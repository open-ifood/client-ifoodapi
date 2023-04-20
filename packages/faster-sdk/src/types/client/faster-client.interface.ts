import { FasterClientConfig } from './faster-client-config.interface';

export interface FasterClient {
  createDeviceSession: CreateDeviceSession;
  dispatchEvent: SendEvents;
}

export interface FasterClientBuilder {
  (config: FasterClientConfig): FasterClient;
}

interface CreateDeviceRequest {
  /** Random UUID V4 */
  deviceId: string;

  /** Random UUID V4 */
  sessionId: string;
  trackInstall: boolean;

  /** WEB, ANDROID, IOS... */
  platform: string;

  /** Operational System */
  system: string;

  /** Operational System version */
  systemVersion: string;

  /** Version of running app (9.89.2) */
  appVersion: string;

  /** Version of SDK (By default 3.2.9) */
  sdkVersion: string;

  vendorId?: null;
  advertisingId?: null;
  pushToken?: null;
  cloudId?: null;
  carrierId?: null;

  /** GMT-0300 */
  timezone: string;

  /** ISO language codes (pt-BR, en-US) */
  language: string;

  deviceProperties: DeviceProperties;

  /** YYYY-mm-ddTHH:mm:ss.sssXZ */
  localTimestamp: string;

  ntpLocalTimestamp?: null;

  /** YYYY-mm-ddTHH:mm:ss.sssXZ */
  sentAt: string;

  ntpsentAt?: null;
}

interface DeviceProperties {
  browserName: string;
  browserVersion: string;
}

interface Response {
  success: boolean;
  statusCode: number;
  description: string;
}

export interface CreateDeviceSession {
  (request: CreateDeviceRequest): Promise<Response>;
}

export interface SendEvents {
  (eventPayload: EventPayload): Promise<Response>;
}

interface EventPayload {
  deviceId: string;
  sessionId: string;
  events: Array<Event>;
  sentAt: string;
  ntpsentAt: string;
}

interface Event {
  eventId: string;
  eventType: string;
  eventTypeRevision: number;
  dimensions: Dimensions;
  localTimestamp: string;
  ntpLocalTimestamp: string;
}

interface Dimensions {
  authType: string;
  accessPoint: string;
  authTypeValue: string;
}
