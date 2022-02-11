import { CreateMemoDto } from './dto/create.dto';
import { MemosFilterDto } from './dto/memos-filter.dto';
import { UpdateMemoDto } from './dto/update.dto';
import { MemoService } from './memo.service';
export declare class MemoController {
    private memoService;
    constructor(memoService: MemoService);
    getMeMosByFilter(headers: any, memosfilterDto: MemosFilterDto): Promise<any>;
    createMemo(headers: any, createMemoDto: CreateMemoDto): Promise<any>;
    updateMemo(updateMemoDto: UpdateMemoDto, memoId: any): Promise<any>;
}
