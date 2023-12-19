import { GetAllUserCommand } from './../commands/command/user/get-all.command';
import { GenerateTokenCommand } from '../commands/command/user/generate-token.comand';
import { CreateUserCommand } from '../commands/command/user/create-user.command';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@/common/interfaces/token-payload.interface';
import { Public } from '@/common/decorators/public.decorator';
import { Body, Controller, Post, Get, UseGuards, Request, Query } from '@nestjs/common';
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

        return await this._commandBus.execute<GenerateTokenCommand, string>(
            new GenerateTokenCommand(user)
        );
    }
    
    @Post('register')
    async create(
        @Body() body
    ): Promise<any> {
        return await this._commandBus.execute<CreateUserCommand, string>(
            new CreateUserCommand(body),
        );
    }

    @Get()
    async getAll(
        @Query() query
    ): Promise<any> {
        return await this._commandBus.execute<GetAllUserCommand, string>(
            new GetAllUserCommand(query),
        );
    }
}