import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    SentryModule.forRoot({
      debug: true,
      dsn: 'https://ee974fc2a2644bbbb680d303af3f41fe@o1113082.ingest.sentry.io/6143117',
      logLevel: LogLevel.Debug,
      environment: 'development',
      tracesSampleRate: 1.0,
    }),

    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfig,
      inject: [ApiConfigService],
    }),

    AuthModule,

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
