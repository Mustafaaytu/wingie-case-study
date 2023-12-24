// dotenv paketini CommonJS uyumlu şekilde yükleyin
const dotenv = require('dotenv');
dotenv.config();

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.local';

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
