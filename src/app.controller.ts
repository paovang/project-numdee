import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@/common/interfaces/token-payload.interface';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { Public } from './common/decorators/public.decorator';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@/common/decorators/user.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly _jwt: JwtService,
  ) {}


  @Get('user/profile')
  getHello(@User() user): string {
    console.log(user);

    return this.appService.getHello();
  } 
  
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
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
