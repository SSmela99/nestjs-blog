import { registerAs } from '@nestjs/config';

export interface AppConfig {
  environment: string;
  apiVersion: string | undefined;
}

export default registerAs(
  'appConfig',
  (): AppConfig => ({
    environment: process.env.NODE_ENV || 'development',
    apiVersion: process.env.API_VERSION,
  }),
);
