import { createParamDecorator } from '@nestjs/common';
import { AccountEntity } from 'src/modules/account/account.entity';

export const AuthAccount = createParamDecorator((data, request): AccountEntity => request.account);
