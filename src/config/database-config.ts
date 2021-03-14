import mongoose from 'mongoose';
import log from './log-config';

const {
  IFOODAPI_DATABASE_USER: USER,
  IFOODAPI_DATABASE_PASS: PASS,
  IFOODAPI_DATABASE_DATABASE: DATABASE,
} = process.env;

mongoose
  .connect(
    `mongodb+srv://${USER}:${PASS}@maincluster.qofhw.mongodb.net/${DATABASE}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => log.info(`Database connected with success`))
  .catch(e => log.error(e, 'Database not connected...'));
