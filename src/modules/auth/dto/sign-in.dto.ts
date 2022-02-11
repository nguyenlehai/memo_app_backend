import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
    @IsDefined()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    readonly username: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    readonly password: string;
}
