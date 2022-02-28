import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import UriEntity from './UriEntity';

@Entity()
export default class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    account: string

    @OneToMany(
        () => UriEntity,
        (uriEntity) => uriEntity.account,
        {
            eager: true,
            cascade: true,
        }
    )
    uris: UriEntity[]
}
