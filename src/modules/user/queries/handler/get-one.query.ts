import { GetOneUserQuery } from './../query/get-one.query';
import { UserModel } from './../../data-typeorm/models/user.model';
import { IReadUserRepository } from './../../domain/repositories/user.interface';
import { READ_USER_REPOSITORY } from './../../data-typeorm/services/inject-key';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetOneUserQuery)
export class GetOneUserQueryHandler implements IQueryHandler<GetOneUserQuery, UserModel>
{
    constructor(
        @Inject(READ_USER_REPOSITORY)
        private readonly _repository: IReadUserRepository
    ) {}
    
    async execute(
        query: GetOneUserQuery,
    ): Promise<UserModel> {
        return await this._repository.getOne(query.id);
    }
}