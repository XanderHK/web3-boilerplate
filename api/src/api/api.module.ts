import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountEntity from 'src/db/entities/AccountEntity';
import UriEntity from 'src/db/entities/UriEntity';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity,
            UriEntity
        ]),
    ],
    controllers: [ApiController],
    providers: [
        ApiService,
    ],
})
export class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

    }
}
