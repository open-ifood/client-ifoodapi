import * as cron from 'node-cron';
import updateTokenJob from './job/update-token-job';
import log from './config/log-config';

log.info('Scheduling cronjobs');
cron.schedule('*/30 * * * *', updateTokenJob);
log.info('Cronjobs scheduled successfully');

updateTokenJob();
