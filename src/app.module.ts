import { MailModule } from '@/infrastructure/adapters/mail/mail.module';
import { QueueModule } from '@/infrastructure/adapters/queue/bull/queue.module';
import { CacheModule } from '@/infrastructure/adapters/cache/redis/cache.module';
import { CatchEverythingFilter } from '@/common/filters/catch-everything.filter';
import { LoggerModule } from '@/infrastructure/adapters/logger/winston/logger.module';
import { I18nModule } from '@/infrastructure/adapters/localization/i18n.module';
import { RoleGuard } from '@/common/guards/role.guard';
import { UserModule } from '@/modules/user/user.module';
import { jwtConfig } from '@/common/configurations/jwt.config';
import { PermissionGuard } from '@/common/guards/permission.guard';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { TypeOrmRepositoryModule } from '@/infrastructure/adapters/repositories/typeorm/typeorm-repository.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    LoggerModule.forRootAsync(),
    I18nModule,
    CacheModule,
    TypeOrmRepositoryModule,
    CqrsModule.forRoot(),
    JwtModule.registerAsync({
      global: true,
      useFactory: jwtConfig,
      inject: [ConfigService],
    }),
    QueueModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    }
  ],
})
export class AppModule {}
