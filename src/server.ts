import express from 'express';
import log from './config/log-config';
import './config';
import './job';
import routes from './routes';

const { PORT = 7000 } = process.env;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => log.info(`Server opened on http://localhost:${PORT}`));
