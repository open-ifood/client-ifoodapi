import { Document, model, Schema } from 'mongoose';
import { v4 as generateRandomUUID } from 'uuid';

export interface ISession {
  email: string;
  /** First token received of ifood */
  key?: string;
  /** Code with 5 digits send from client to secondary auth */
  auth_code?: number;
  /** Token received in secondary auth */
  access_token?: string;
  /** Token received in last step of auth, used to refresh token used session */
  refresh_token?: string;
  /** if user is authenticated with success */
  authenticated?: boolean;
  /** hash that represent account id of user in ifood api */
  account_id?: string;
  /** our auth token */
  token?: string;
}

export interface SessionModel extends ISession, Document {}

const SessionSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  token: {
    type: String,
    unique: true,
    default: generateRandomUUID,
  },
  key: String,
  auth_code: Number,
  access_token: String,
  refresh_token: String,
  account_id: String,
});

export const Session = model<SessionModel>('Session', SessionSchema);
