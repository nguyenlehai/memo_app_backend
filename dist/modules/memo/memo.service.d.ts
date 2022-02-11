import { MemosFilterDto } from './dto/memos-filter.dto';
import { MemoRepository } from './memo.repository';
import { CreateMemoDto } from './dto/create.dto';
import { UpdateMemoDto } from './dto/update.dto';
import { CustomerRepository } from '../customer/customer.repository';
export declare class MemoService {
    private memoRepository;
    private customerRepository;
    constructor(memoRepository: MemoRepository, customerRepository: CustomerRepository);
    getMemosByFilter(headers: any, memosfilterDto: MemosFilterDto): Promise<any>;
    createMemo(headers: any, createMemoDto: CreateMemoDto): Promise<any>;
    updateMemo(updatMemoDto: UpdateMemoDto, memoId: string): Promise<any>;
}
