import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from 'src/constants/auth.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: ActiveUserData }>();
    const user: ActiveUserData = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
