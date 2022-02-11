export class TokensDto {
    access: {
        token: string;
        expires: Date;
    };

    refresh: {
        token: string;
        expires: Date;
    };
}
