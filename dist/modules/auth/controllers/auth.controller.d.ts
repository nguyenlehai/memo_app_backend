import { SignInDto } from '../dto/sign-in.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<any>;
}
