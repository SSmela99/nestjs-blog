import { registerAs } from '@nestjs/config';

export interface JwtConfig {
  secret: string | undefined;
  audience: string | undefined;
  issuer: string | undefined;
  accessTokenTtl: string | undefined;
  refreshTokenTtl: string | undefined;
}

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  accessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.JWT_REFRESH_TOKEN_TTL,
}));
