import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalSignInStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalSignInStrategy extends LocalSignInStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(account_id: string, password: string): Promise<any>;
}
export {};
