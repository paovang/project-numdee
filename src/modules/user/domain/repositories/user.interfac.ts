import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export interface IWriteUserRepository {
    create(input: UserEntity): Promise<UserEntity>;
}