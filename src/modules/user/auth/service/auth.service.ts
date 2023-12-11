import { UserModel } from './../../data-typeorm/models/user.model';
import { DatabaseConnection } from './../../../../common/configurations/typeorm.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectDataSource(DatabaseConnection.Main)
        private _dataSource: DataSource,
    ) {}


    async findOne(id: number): Promise<any> {
        const user = await this._dataSource
            .getRepository(UserModel)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.roles', 'role')
            .leftJoinAndSelect('role.permissions', 'permission')
            .where('users.id = :id', { id })
            .getOne();

        return user;
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this._dataSource
            .getRepository(UserModel)
            .createQueryBuilder('users')
            .where('users.username = :username', { username })
            .getOne();
        
        if (user && await compare(password, user.password)) {
            return user;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}