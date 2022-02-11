import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TokenType } from './token-type.enum';
import { AccountEntity } from '../account/account.entity';

@Entity({
    name: 'token',
})
export class TokenEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({})
    accountId: number;

    @Column({})
    token: string;

    @Column({})
    expires: Date;

    @Column({ type: 'enum', enum: TokenType, default: TokenType.REFRESH_TOKEN })
    type: TokenType;

    @CreateDateColumn({
        type: 'datetime',
        name: 'createdAt',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'datetime',
        name: 'updatedAt',
    })
    updatedAt: Date;

    @ManyToOne(
        type => AccountEntity,
        account => account.tokens,
    )
    @JoinColumn({
        name: 'accountId',
        referencedColumnName: 'id',
    })
    account: AccountEntity;
}
