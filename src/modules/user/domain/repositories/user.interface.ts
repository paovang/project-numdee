import { UserModel } from './../../data-typeorm/models/user.model';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export interface IWriteUserRepository {
    create(input: UserEntity): Promise<UserEntity>;

    getOne(id: number): Promise<UserModel>;

    findUserName(username: string): Promise<UserModel>;

    getAll(query: any): Promise<UserModel>;
}