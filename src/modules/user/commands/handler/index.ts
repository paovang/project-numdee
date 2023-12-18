import { CreateUserUseCase } from './create-user.user-case';
import { Provider } from '@nestjs/common';

export const userCommandHandler: Provider[] = [
    CreateUserUseCase
]