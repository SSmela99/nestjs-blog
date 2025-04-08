import { Injectable } from '@nestjs/common';
import { SigninProvider } from './signin.provider';
import { SigninDto } from '../dtos/signin.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly signinProvider: SigninProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}
  public async signin(signinDto: SigninDto) {
    return await this.signinProvider.signIn(signinDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }
}
