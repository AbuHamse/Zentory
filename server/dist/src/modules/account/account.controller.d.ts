import { AccountService } from './account.service';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    getMe(): {
        id: string;
        status: string;
        settings: {};
    };
}
