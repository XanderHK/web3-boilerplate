import {
    IsNotEmpty,
} from 'class-validator';

export class NftMetaDataDTO {
    @IsNotEmpty()
    account: string

    @IsNotEmpty()
    uri: string;

    @IsNotEmpty()
    tokenId: number;
}
