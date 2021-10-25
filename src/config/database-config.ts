import mongoose from 'mongoose';
import log from './log-config';

const {
  IFOODAPI_DATABASE_USER: USER,
  IFOODAPI_DATABASE_PASS: PASS,
  IFOODAPI_DATABASE_DATABASE: DATABASE,
  IFOODAPI_DATABASE_CLUSTER: CLUSTER,
} = process.env;

const databaseEnvs = [USER, PASS, DATABASE, CLUSTER];

(async () => {
  const existBlankEnv = databaseEnvs.some(env => env === undefined);

  if (existBlankEnv) {
    console.error(
      `Database not opened, some env were not found, please verify .env`
    );
  } else {
    mongoose
      .connect(
        `mongodb+srv://${USER}:${PASS}@${CLUSTER}/${DATABASE}?retryWrites=true&w=majority`,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
        }
      )
      .then(() =>
        log.info(
          `Database ${USER}:${CLUSTER}:${DATABASE} connected with success`
        )
      )
      .catch(e =>
        log.error(e, `Database not connected... ${USER}:${CLUSTER}:${DATABASE}`)
      );
  }
})();
