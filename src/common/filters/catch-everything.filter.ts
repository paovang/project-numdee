import { LOGGER_SERVICE } from '@/infrastructure/adapters/logger/inject-key';
// import { NOTIFICATION_SERVICE } from '@/infrastructure/adapters/notification/inject-key';
// import { NotificationTypes } from '@/infrastructure/adapters/notification/notification.service';
import { ILogger } from '@/infrastructure/ports/logger/logger.interface';
// import { INotification } from '@/infrastructure/ports/notification/notification.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import moment from 'moment';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CustomException } from '../exception/custom.exception';
import { IEnv } from '../interfaces/env.interface';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly i18n: I18nService,
    @Inject(LOGGER_SERVICE) private readonly logger: ILogger,
    // @Inject(NOTIFICATION_SERVICE)
    // private readonly notificationService: INotification,
    @Inject(ConfigService) private readonly config: ConfigService<IEnv>,
  ) {}

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const errorContext = {
      url: request.url,
      method: request.method,
      headers: request.headers,
      body: request.body,
    };
    const { status, message } = await this.handleException(
      exception,
      errorContext,
    );

    const responseBody = {
      statusCode: status,
      message,
      timestamp: moment(new Date().toISOString()).format('DD-MM-YYYY HH:mm:ss'),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }

  private async handleException(exception: any, errorContext: any) {
    const isProduction = this.config.get('NODE_ENV') === 'production';
    let status: number;
    let message: string;

    if (exception instanceof CustomException) {
      status = exception.getStatus();
      const messageKey = this.formatMessageKey(exception.message);
      const i18nFile = exception.getI18nFile();
      const args = exception.getArguments();

      message = this.i18n.t(`${i18nFile}.${messageKey}`, {
        lang: I18nContext.current().lang,
        args,
      });
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const messageKey = this.formatMessageKey(exception.message);

      try {
        message = this.i18n.t(`error.${messageKey}`, {
          lang: I18nContext.current().lang,
        });
      } catch (error) {
        message = exception.message;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message + ' ' + exception.hint ?? '';
      this.logger.error(`[Server Error] Message: ${message}`, exception.stack);
      if (isProduction) {
        // await this.notificationService.sendNotification(
        //   NotificationTypes.SLACK,
        //   this.config.get<string>('SLACK_WEBHOOK_URL'),
        //   'SERVER ERROR',
        //   `[${exception.constructor.name}] Message: ${message} ${exception.stack} ${errorContext}`,
        // );
      }
    }

    return { status, message };
  }

  private formatMessageKey(message: string): string {
    return message.toUpperCase().replace(/ /g, '_');
  }
}