import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SigninProvider } from './providers/signin.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './providers/auth.service';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [
    SigninProvider,
    BcryptProvider,
    { provide: HashingProvider, useClass: BcryptProvider },
    GenerateTokensProvider,
    AuthService,
    RefreshTokensProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [HashingProvider],
})
export class AuthModule {}
