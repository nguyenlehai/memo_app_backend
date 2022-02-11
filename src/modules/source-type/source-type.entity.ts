import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
    name: 'source-types',
})
export class SouceTypeEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', unique: true })
    code: number;

    @Column({ type: 'varchar', length: 64 })
    name: string;

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
}
