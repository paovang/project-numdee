import { userQueries } from './queries/index';
import { userDataServices } from './data-typeorm/services/index';
import { userCommandHandler } from './commands/handler/index';
import { userControllers } from './controllers/index';
import { AuthService } from './auth/service/auth.service';
import { userModels } from './data-typeorm/models/index';
import { DatabaseConnection } from '@/common/configurations/typeorm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { strategies } from './auth';

@Module({
    imports: [
      TypeOrmModule.forFeature(userModels, DatabaseConnection.Main),
      
    ],
    controllers: [
      ...userControllers
    ],
    providers: [
      ...userQueries,
      ...userCommandHandler,
      AuthService,
      ...strategies,
      ...userDataServices
    ],
    exports: [

    ],
})
export class UserModule {}
