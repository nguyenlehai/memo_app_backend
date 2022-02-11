import { Connection } from 'typeorm';
import { CompanyEntity } from '../entities/CompanyEntity';
export declare const companyProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<CompanyEntity>;
    inject: string[];
}[];
