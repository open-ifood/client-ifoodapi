import express from 'express';
import log from './config/log-config';
import './config';
import routes from './routes';

const { IFOODAPI_PORT: PORT } = process.env;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => log.info(`Server opened on http://localhost:${PORT}`));
