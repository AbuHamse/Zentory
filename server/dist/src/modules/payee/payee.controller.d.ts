import { PayeeService } from './payee.service';
export declare class PayeeController {
    private readonly payeeService;
    constructor(payeeService: PayeeService);
    getAll(): Promise<{
        [x: string]: unknown;
    }[]>;
    createPayee(data: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        phone: string;
        company: string;
        mainBranch: string;
        joinDate: Date;
        avatarUrl: string;
        address: {
            city: string;
            provinceState: string;
            postalCode: string;
            country: string;
        };
    }[]>;
    getOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        phone: string;
        company: string;
        mainBranch: string;
        joinDate: Date;
        avatarUrl: string;
        address: {
            city: string;
            provinceState: string;
            postalCode: string;
            country: string;
        };
    }>;
}
