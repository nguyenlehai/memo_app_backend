import { AccountEntity } from 'src/entities/AccountEntity';
import { Connection } from 'typeorm';
export declare const accountProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<AccountEntity>;
    inject: string[];
}[];
