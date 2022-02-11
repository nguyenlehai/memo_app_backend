export declare class LoginRequest {
    readonly account_id: string;
    readonly password: string;
}
export declare class RegisterRequest {
    readonly company_id: string;
    readonly account_id: string;
    readonly password: string;
}
export declare class RefreshRequest {
    readonly refresh_token: string;
}
