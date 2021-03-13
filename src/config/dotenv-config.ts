const dotenv = require('dotenv');
const expanded = require('dotenv-expand');

const myenv = dotenv.config();
expanded(myenv);
