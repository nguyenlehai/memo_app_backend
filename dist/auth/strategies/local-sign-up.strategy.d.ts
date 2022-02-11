import { Strategy } from 'passport-local';
import { Request } from 'express';
import { AuthService } from '../auth.service';
declare const LocalSignUpStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalSignUpStrategy extends LocalSignUpStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(req: Request, account_id: string, password: string): Promise<any>;
}
export {};
