import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AccountEntity from 'src/db/entities/AccountEntity';
import UriEntity from 'src/db/entities/UriEntity';
import { Repository } from 'typeorm';
import { NftMetaDataDTO } from './api.dto';


@Injectable()
export class ApiService {
    constructor(
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(UriEntity)
        private uriRepository: Repository<UriEntity>,
    ) { }

    async getAccounts() {
        return this.accountRepository.find();
    }

    async getAccount(account: string) {
        return this.accountRepository.findOne({ account: account })
    }

    async add(body: NftMetaDataDTO) {
        try {
            const account = await this.accountRepository.findOne({ account: body.account })
            const uri = await this.uriRepository.findOne({ uri: body.uri })
            if (!account) {
                const account: AccountEntity = this.accountRepository.create({
                    account: body.account,
                    uris: []
                });
                await this.accountRepository.save(account);

                const uri: UriEntity = this.uriRepository.create({
                    uri: body.uri,
                    account: account
                })

                await this.uriRepository.save(uri)
            }

            if (!uri) {
                await this.uriRepository.save(this.uriRepository.create({
                    uri: body.uri,
                    account: account
                }))
            }
        } catch (exc) {
            console.log(exc)
        }
    }

    async populate(body: NftMetaDataDTO[]) {
        for (const entry of body) {
            this.add(entry)
        }
    }
}
