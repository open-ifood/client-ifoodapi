import logger from 'pino';

const { NODE_ENV: ENV } = process.env;

export default logger({
  prettyPrint: ENV !== 'production' && {
    colorize: true,
    levelFirst: true,
  },
  prettifier: require('pino-pretty'),
});
