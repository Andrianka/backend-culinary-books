import { registerAs } from '@nestjs/config';

export default registerAs('global', () => ({
  path: process.env.API_PATH || '',
  env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwt_access_life_time: process.env.ACCESS_TOKEN_LIFE_TIME,
  jwt_refresh_life_time: process.env.REFRESH_TOKEN_LIFE_TIME,
}));
