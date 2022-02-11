import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { TokenEntity } from '../token/token.entity';
import { MemoEntity } from '../memo/memo.entity';
import { CompanyEntity } from '../company/company.entity';

@Entity({
    name: 'account',
})
@Index(["username", "companyId"], { unique: true })
export class AccountEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Index("username")
    @Column({ length: 64, type: 'varchar' })
    username: string;

    @Index("externalAccountId")
    @Column({ length: 64, type: 'varchar', nullable: true })
    externalAccountId: string;

    @Column({ length: 100, type: 'varchar' })
    accountName: string;

    @Index("companyId")
    @Column({ length: 64, type: 'varchar' })
    companyId: string;

    @Column({ length: 64, type: 'varchar' })
    password: string;

    @Column({ type: 'datetime', nullable: true })
    deletedAt: Date;

    @Column({ type: 'int', nullable: true })
    deletedBy: number;

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

    @OneToMany(
        type => TokenEntity,
        token => token.accountId,
        {},
    )
    tokens: TokenEntity[];

    @OneToMany(
        type => MemoEntity,
        memo => memo.createdBy,
    )
    memos: MemoEntity[];

    @ManyToOne(
        type => CompanyEntity,
        company => company.accounts,
    )
    @JoinColumn({
        name: 'companyId',
        referencedColumnName: 'companyId',
    })
    company: CompanyEntity;

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
