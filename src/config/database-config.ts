import mongoose from 'mongoose';

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
        }
      )
      .then(() => console.log(`Database connected with success`))
      .catch(e => console.error(e, 'Database not connected...'));
  }
})();
