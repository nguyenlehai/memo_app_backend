import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AccountService } from 'src/modules/account/account.service';
import { AccountDto } from 'src/modules/account/dto/account.dto';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private accountService;
    constructor(accountService: AccountService);
    validate(payload: JwtPayload): Promise<AccountDto>;
}
export {};
