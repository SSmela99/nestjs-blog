import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/constants/auth.constants';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
