import { GetOneUserQueryHandler } from './handler/get-one.query';
import { GetAllUserQueryHandler } from './handler/get-all.query';
import { Provider } from '@nestjs/common';

export const userQueries: Provider[] = [
    GetAllUserQueryHandler,
    GetOneUserQueryHandler
];