import { readUserTypeOrmRepositoryProvider } from './read.service';
import { writeUserTypeOrmRepositoryProvider } from './write.service';
import { Provider } from '@nestjs/common';

export const userDataServices: Provider[] = [
    writeUserTypeOrmRepositoryProvider,
    readUserTypeOrmRepositoryProvider
];