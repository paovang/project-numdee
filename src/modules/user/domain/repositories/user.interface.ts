import { CreateUserDto, UpdateUserDto } from './../../dtos/user/create.dto';
import { UserModel } from './../../data-typeorm/models/user.model';

export interface IWriteUserRepository {
    create(input: CreateUserDto): Promise<UserModel>;

    update(id: number, input: UpdateUserDto): Promise<UserModel>;

    delete(id: number): Promise<UserModel>;

    test(input: any): Promise<any>;
}

export interface IReadUserRepository {
    getAll(query: any): Promise<UserModel>;

    getOne(id: number): Promise<UserModel>;

    findUserName(username: string): Promise<UserModel>;
}