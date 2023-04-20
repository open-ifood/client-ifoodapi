const dotenv = require('dotenv');
const expanded = require('dotenv-expand');

const myenv = dotenv.config({
  path: 'src/.env.test',
});

expanded(myenv);
