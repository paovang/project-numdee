import { JobNames } from '@/infrastructure/adapters/queue/bull/constants/queue.constant';
import { IDefualtQueue } from '@/infrastructure/ports/queue/default-queue.interface';
import { DEFAULT_QUEUE_SERVICE } from '@/infrastructure/adapters/queue/inject-key';
import { ICache } from '@/infrastructure/ports/cache/cache.interface';
import { CACHE_SERVICE } from '@/infrastructure/adapters/cache/inject-key';
import { Roles } from './common/decorators/role.decorator';
import { Permissions } from './common/decorators/permission.decorator';
import { Permission } from './modules/user/domain/entities/permission.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@/common/interfaces/token-payload.interface';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { Public } from './common/decorators/public.decorator';
import { Controller, Get, Post, Request, UseGuards, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@/common/decorators/user.decorator';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly _jwt: JwtService,
    private readonly i18n: I18nService,
    @Inject(CACHE_SERVICE) private readonly cacheService: ICache<any>,
    @Inject(DEFAULT_QUEUE_SERVICE)
    private readonly _queue: IDefualtQueue<any>
  ) {}


  // @Roles('super-admin', 'admin')
  @Permissions(Permission.ReadUsers)
  @Get('user/profile')
  async getHello(@User() user): Promise<any> {
    // console.log('user', user);
    
    // const transMessage = this.i18n.t('error.BAD_REQUEST', {
    //     lang: I18nContext.current().lang
    // });
    // console.log(transMessage);

    
    await this._queue.addJob(JobNames.SendMail, { 
      email: 'vangpaovang@gmail.com',
      subject: "test send email",
      context: "this is my body"
    });

    return this.appService.getHello();
  } 
  
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = req.user;

    const payload: TokenPayload = {
      sub: user.id,
      username: user.username,
      timestamp: new Date().getTime(),
    };

    const token = this._jwt.sign(payload);

    return { accessToken: token, user: user };
  }
}

// if (!await this.cacheService.get('accessToken')) {
//   await this.cacheService.set('accessToken', token, 3600000);
// }

// console.log(await this.cacheService.get('accessToken'));