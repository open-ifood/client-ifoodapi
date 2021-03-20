import { Document, model, Schema } from 'mongoose';
import { v4 as generateRandomUUID } from 'uuid';

export interface ISession {
  email: string;
  key?: string; // First token received of ifood
  auth_code?: number; // Code with 5 digits send from client to secondary auth
  access_token?: string; // Token received in secondary auth
  refresh_token?: string; // Token received in last step of auth, used to refresh token used session
  authenticated?: boolean; // if user is authenticated with success
  account_id?: string; // hash that represent account id of user in ifood api
  token?: string; // our token
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
