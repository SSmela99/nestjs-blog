import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './auth/guards/authentication.guard';

const ENV = process.env.NODE_ENV?.trim();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          synchronize: configService.get('database.synchronize'),
          port: configService.get('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          host: configService.get('database.host'),
          autoLoadEntities: configService.get('database.autoLoadEntities'),
          database: configService.get('database.name'),
        };
      },
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    AccessTokenGuard,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
  ],
})
export class AppModule {}
