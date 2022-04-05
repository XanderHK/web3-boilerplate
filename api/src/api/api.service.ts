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
                    tokenId: body.tokenId,
                    account: account
                })

                await this.uriRepository.save(uri)
            }

            if (!uri) {
                await this.uriRepository.save(this.uriRepository.create({
                    uri: body.uri,
                    tokenId: body.tokenId,
                    account: account
                }))
            }

            // todo check if this works properly next transfer
            if (account.uris?.filter(e => e.tokenId === uri.tokenId).length <= 0) {
                console.log(uri)
                await this.uriRepository.delete({ uri: uri.uri })
                await this.uriRepository.save(this.uriRepository.create({
                    uri: body.uri,
                    tokenId: body.tokenId,
                    account: account
                }))
            }

        } catch (exc) {
            console.log(exc)
        }
    }

    async removeURI(uri: string) {
        const foundUri = await this.uriRepository.find({ uri: uri })
        if (foundUri.length < 1) return
        const result = await this.uriRepository.delete({ uri: uri })
        return result
    }
}
