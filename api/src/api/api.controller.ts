import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Req,
} from '@nestjs/common';
import { NftMetaDataDTO } from './api.dto';
import { ApiService } from './api.service';
import { Request } from 'express';

@Controller('/api')
export class ApiController {
    constructor(private readonly apiService: ApiService) { }

    @Get('/accounts')
    async getAccounts() {
        return this.apiService.getAccounts()
    }

    @Get('/accounts/:identifier')
    async getAccount(@Param('identifier') identifier: string) {
        return this.apiService.getAccount(identifier)
    }

    @Post('/populate')
    async populate(@Body() body: NftMetaDataDTO[]) {
        this.apiService.populate(body)
    }

    @Post('/add')
    async add(@Body() body: NftMetaDataDTO) {
        this.apiService.add(body)
    }
}
