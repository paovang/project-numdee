import { TokenPayload } from '@/common/interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PermissionModel } from './../models/permission.model';
import { RoleModel } from './../models/role.model';
import { hash } from 'bcrypt';
import { UserModel } from './../models/user.model';
import { DatabaseConnection } from '@/common/configurations/typeorm.config';
import { DataSource, In } from 'typeorm';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { IWriteUserRepository } from '../../domain/repositories/user.interface';
import { Injectable, InternalServerErrorException, Provider } from '@nestjs/common';
import { WRITE_USER_REPOSITORY } from './inject-key';
import { InjectDataSource } from '@nestjs/typeorm';
import { camelToSnakeCase } from '@/common/utils/mapper';

@Injectable()
export class WriteUserTypeOrmRepository implements IWriteUserRepository
{
    constructor(
        @InjectDataSource(DatabaseConnection.Main)
        private _dataSource: DataSource
    ) {}

    async create(input: any): Promise<any> {
        let res: UserModel;

        const queryRunner = this._dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const model = new UserModel();
            model.username = input.username;
            model.email = input.email;
            model.password = await hash(input.password, 10);
            
            const roles = await queryRunner.manager.find(RoleModel, { where: { id: In(input.roleIds) } });
            model.roles = roles;

            res = await queryRunner.manager.save<UserModel>(model);
           
            await queryRunner.commitTransaction();
        } catch (error: unknown) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error);
        } finally {
            await queryRunner.release();
        }

        return res;
    }

    async getOne(id: number): Promise<UserModel> {
        const user = await this._dataSource
            .getRepository(UserModel)
            .findOne({ 
                where: { id }, 
                relations: ['roles', 'roles.permissions']
            });

        if (user) {
            // Sort permissions by their id in descending order
            user.roles.forEach(role => {
                role.permissions.sort((a, b) => b.id - a.id);
            });
        }

        return user;
    }

    async findUserName(username: string): Promise<UserModel | undefined> {
        const value = camelToSnakeCase(username);

        const res = await this._dataSource
        .getRepository(UserModel)
        .createQueryBuilder('users')
        .where(`users.username = :username`, { username: value })
        .getOne();

        return res;
    }

    async getAll({
        limit,
        page
    }): Promise<any> {
        const queryBuilder = this._dataSource
            .getRepository(UserModel)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.roles', 'role')
            .leftJoinAndSelect('role.permissions', 'permission')
            .take(limit || undefined) // Take `limit` only if it's provided
            .skip(page ? (page - 1) * (limit || 0) : 0); // Skip only if `page` is provided
        
        const [results, totalCount] = await queryBuilder.getManyAndCount();

        return { 
            data: results, 
            total: totalCount, 
            limit: limit ? +limit : undefined, 
            page: page ? +page : undefined 
        };
    }
}

export const writeUserTypeOrmRepositoryProvider: Provider = {
    provide: WRITE_USER_REPOSITORY,
    useClass: WriteUserTypeOrmRepository,
};