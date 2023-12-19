import { GetOneUserQuery } from './../queries/query/get-one.query';
import { UserModel } from './../data-typeorm/models/user.model';
import { GetAllUserQuery } from './../queries/query/get-all.query';
import { GenerateTokenCommand } from '../commands/command/user/generate-token.comand';
import { CreateUserCommand } from '../commands/command/user/create-user.command';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { Public } from '@/common/decorators/public.decorator';
import { Body, Controller, Post, Get, UseGuards, Request, Query, Param, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('admin/users')
export class UserController {
    constructor(
        private readonly _commandBus: CommandBus,
        private readonly _queryBus: QueryBus
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
        const result = await this._queryBus.execute<GetAllUserQuery, UserModel>(new GetAllUserQuery(query));
        
        return result;
    }

    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<any> {
        const result = await this._queryBus.execute<GetOneUserQuery, UserModel>(new GetOneUserQuery(id));
        
        return result;
    }
}