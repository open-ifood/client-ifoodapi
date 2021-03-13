import express from 'express';
import './config/dotenv-config';
import './config/database-config';
import routes from './routes';

const { IFOODAPI_PORT: PORT } = process.env;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () =>
  console.log(`Server opened on http://localhost:${PORT}`)
);
