import { AccountEntity } from 'src/entities/AccountEntity';
import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from '../validate/requests';
export interface AuthenticationPayload {
    account: AccountEntity;
    payload: {
        type: string;
        token: string;
        refresh_token?: string;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: RegisterRequest): Promise<{
        status: string;
        data: AccountEntity;
    }>;
    login(body: LoginRequest): Promise<{
        status: string;
        data: AuthenticationPayload;
    }>;
}
