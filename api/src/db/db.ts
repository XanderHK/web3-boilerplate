import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    POSTGRES_DATABASE,
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_USER,
} from 'src/cfg';
import AccountEntity from './entities/AccountEntity';
import UriEntity from './entities/UriEntity';

export function dbConnect(): DynamicModule {
    return TypeOrmModule.forRoot({
        type: 'postgres',
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        database: POSTGRES_DATABASE,
        password: POSTGRES_PASSWORD,
        username: POSTGRES_USER,
        entities: [
            AccountEntity,
            UriEntity
        ],
        synchronize: true,
    });
}
