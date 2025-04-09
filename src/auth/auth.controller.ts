import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { AuthService } from './providers/auth.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async signin(@Body() signinDto: SigninDto) {
    return await this.authService.signin(signinDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshToken);
  }
}
