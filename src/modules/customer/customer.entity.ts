import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MemoEntity } from '../memo/memo.entity';
import { CompanyEntity } from '../company/company.entity';

@Entity({
    name: 'customer',
})
@Index(["customerId", "companyId"], {unique: true})
@Index(["customerId", "customerName"], { fulltext: true, parser: 'mecab' })
export class CustomerEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Index("customerId")
    @Column({ length: 64, type: 'varchar' })
    customerId: string;

    @Index("externalCustomerId")
    @Column({ length: 64, type: 'varchar', nullable: true })
    externalCustomerId: string;

    @Column({ length: 64, type: 'varchar' })
    customerName: string;

    @Index("companyId")
    @Column({ length: 45, type: 'varchar' })
    companyId: string;

    @Column({ type: 'text', nullable: true })
    note: string;

    @Column({ type: 'int' })
    createdBy: number;

    @Column({ type: 'int', nullable: true })
    deletedBy: number;

    @Column({ type: 'datetime', nullable: true })
    deletedAt: number;

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
        type => MemoEntity,
        memo => memo.customerId,
    )
    memos: MemoEntity[];

    @ManyToOne(
        type => CompanyEntity,
        company => company.customers,
    )
    @JoinColumn({
        name: 'companyId',
        referencedColumnName: 'companyId',
    })
    company: CompanyEntity;
}
