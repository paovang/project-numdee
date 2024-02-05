import { Public } from "@/common/decorators/public.decorator";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateTestCommand } from "../commands/command/test/create-command";
import { Permissions } from "@/common/decorators/permission.decorator";
import { Permission } from "../domain/entities/permission.entity";
import { Roles } from "@/common/decorators/role.decorator";

@Controller('admin/auth')
export class AuthController {
    constructor(
        private readonly _commandBus: CommandBus
    )
    {
        
    }

    // @Public()
    // @Permissions(Permission.CreateUsers)
    @Roles('super-admin', 'admin')
    @Post('all')
    async getAll(
        @Body() body: any
    ): Promise<any> {
        return await this._commandBus.execute<CreateTestCommand, string>(
            new CreateTestCommand(body),
        );
    }
}