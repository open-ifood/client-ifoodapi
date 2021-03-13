import mongoose from 'mongoose';

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
  .then(() => console.log(`Database connected with success`))
  .catch(e => console.error(e, 'Database not connected...'));
