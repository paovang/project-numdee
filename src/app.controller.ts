import { RoleName } from './modules/user/domain/entities/role.entity';
import { Roles } from './common/decorators/role.decorator';
import { Permissions } from './common/decorators/permission.decorator';
import { Permission } from './modules/user/domain/entities/permission.entity';
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


  // @Roles('super-admin', 'admin')
  @Permissions(Permission.ReadUsers)
  @Get('user/profile')
  getHello(@User() user): string {
    // console.log('user', user);

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
