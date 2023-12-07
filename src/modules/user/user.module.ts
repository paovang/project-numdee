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
    controllers: [],
    providers: [
        AuthService,
        ...strategies
    ],
    exports: [],
})
export class UserModule {}
