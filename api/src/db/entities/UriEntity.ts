import {
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    Column,
    ManyToOne
} from 'typeorm';
import AccountEntity from './AccountEntity';

@Entity()
export default class UriEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    uri: string;

    @Column({
        unique: true,
    })
    tokenId: number;

    @ManyToOne(
        (type) => AccountEntity,
        (accountEntity) => accountEntity.uris,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    )
    @JoinColumn()
    account: AccountEntity
}
