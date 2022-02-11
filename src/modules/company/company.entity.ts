import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { CustomerEntity } from '../customer/customer.entity';

@Entity({
    name: 'company',
})
export class CompanyEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 100, type: 'varchar' })
    companyName: string;

    @Column({ unique: true, length: 45, type: 'varchar' })
    companyId: string;

    @Column({ type: 'int', nullable: true, default: null })
    srcType: number;

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
        type => AccountEntity,
        account => account.company,
    )
    accounts: AccountEntity[];

    @OneToMany(
        type => CustomerEntity,
        customer => customer.companyId,
        {},
    )
    customers: CustomerEntity[];
}
