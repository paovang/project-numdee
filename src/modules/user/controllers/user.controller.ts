import { CreateUserCommand } from './../commands/command/create-user.command';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@/common/interfaces/token-payload.interface';
import { Public } from '@/common/decorators/public.decorator';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('admin/users')
export class UserController {
    constructor(
        private readonly _jwt: JwtService,
        private readonly _commandBus: CommandBus
    )
    {

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
    
    @Post('register')
    async create(
        @Body() body
    ): Promise<any> {
        return await this._commandBus.execute<CreateUserCommand, string>(
            new CreateUserCommand(body),
        );
    }
}