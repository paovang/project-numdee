import { UserModel } from './../../data-typeorm/models/user.model';
import { GetAllUserQuery } from './../query/get-all.query';
import { IReadUserRepository } from './../../domain/repositories/user.interface';
import { READ_USER_REPOSITORY } from './../../data-typeorm/services/inject-key';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllUserQuery)
export class GetAllUserQueryHandler implements IQueryHandler<GetAllUserQuery, UserModel>
{
    constructor(
        @Inject(READ_USER_REPOSITORY)
        private readonly _repository: IReadUserRepository
    ) {}
    
    async execute(
        query: GetAllUserQuery,
    ): Promise<UserModel> {
        return await this._repository.getAll(query.input);
    }
}