import { UserModel } from './../models/user.model';
import { DatabaseConnection } from '@/common/configurations/typeorm.config';
import { DataSource, In } from 'typeorm';
import { IReadUserRepository } from '../../domain/repositories/user.interface';
import { Injectable, Provider } from '@nestjs/common';
import { READ_USER_REPOSITORY } from './inject-key';
import { InjectDataSource } from '@nestjs/typeorm';
import { camelToSnakeCase } from '@/common/utils/mapper';

@Injectable()
export class ReadUserTypeOrmRepository implements IReadUserRepository
{
    constructor(
        @InjectDataSource(DatabaseConnection.Main)
        private _dataSource: DataSource
    ) {}

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
            .leftJoin('users.roles', 'role')
            .leftJoin('role.permissions', 'permission')

        queryBuilder.addSelect([
            'role.id', 
            'role.name', 
            'role.description', 
            'permission.id',
            'permission.name',
            'permission.description',
        ]);
        queryBuilder.take(limit || undefined).skip(page ? (page - 1) * (limit || 0) : 0);
        
        const [results, totalCount] = await queryBuilder.getManyAndCount();

        return { 
            data: results, 
            total: totalCount, 
            limit: limit ? +limit : undefined, 
            page: page ? +page : undefined 
        };
    }
}

export const readUserTypeOrmRepositoryProvider: Provider = {
    provide: READ_USER_REPOSITORY,
    useClass: ReadUserTypeOrmRepository,
};