import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { CustomerEntity } from '../customer/customer.entity';

@Entity({
    name: 'memo',
})
@Index(["customerId", "memo"], { fulltext: true, parser: 'mecab' })
export class MemoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Index("customerId")
    @Column({ length: 64, type: 'varchar' })
    customerId: string;

    @Column({ type: 'text' })
    memo: string;

    @Column({ type: 'datetime', nullable: true })
    deletedAt: Date;

    @Column({ type: 'int', nullable: true })
    deletedBy: number;

    @Index("createdBy")
    @Column({ type: 'int' })
    createdBy: number;

    @CreateDateColumn({
        type: 'datetime',
        name: 'createdAt',
    })
    createdAt: Date;

    @Index("updatedAt")
    @UpdateDateColumn({
        type: 'datetime',
        name: 'updatedAt',
    })
    updatedAt: Date;

    @ManyToOne(
        type => AccountEntity,
        account => account.memos,
    )
    @JoinColumn({
        name: 'createdBy',
        referencedColumnName: 'id',
    })
    account: AccountEntity;

    @ManyToOne(
        type => CustomerEntity,
        customer => customer.memos,
    )
    @JoinColumn({
        name: 'customerId',
        referencedColumnName: 'customerId',
    })
    customer: CustomerEntity;
}
