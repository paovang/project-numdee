import { Public } from "@/common/decorators/public.decorator";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateTestCommand } from "../commands/command/test/create-command";

@Controller('admin/auth')
export class AuthController {
    constructor(
        private readonly _commandBus: CommandBus
    )
    {

    }

    @Public()
    @Post('all')
    async getAll(
        @Body() body: any
    ): Promise<any> {
        return await this._commandBus.execute<CreateTestCommand, string>(
            new CreateTestCommand(body),
        );
    }
}