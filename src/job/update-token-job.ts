import { Session, SessionModel } from '../model/session';
import { MarketplaceAPI } from '../service';
import log from '../config/log-config';

export default async function updateTokenJob() {
  const updateToken = async (session: SessionModel) => {
    const { refresh_token } = session;

    if (!refresh_token) return;

    const {
      success,
      access_token,
      refresh_token: new_refresh_token,
    } = await MarketplaceAPI.refreshToken({
      refresh_token: refresh_token,
    });

    if (success && new_refresh_token && access_token) {
      session.updateOne({
        access_token,
        refresh_token: new_refresh_token,
      });
      log.info(
        `[JOB] token refreshed successfully ${JSON.stringify({
          message: 'token refreshed',
          session: session.key,
          access_token,
          new_refresh_token,
        })}`
      );
    }
  };

  log.info('[JOB] refreshing token for actual sessions');
  const sessions = await Session.find();
  sessions.forEach(updateToken);
}
