import { Repository } from 'typeorm';
import { CreateMemoDto } from './dto/create.dto';
import { MemoDto } from './dto/memo.dto';
import { MemosFilterDto } from './dto/memos-filter.dto';
import { UpdateMemoDto } from './dto/update.dto';
import { MemoEntity } from './memo.entity';
export declare class MemoRepository extends Repository<MemoEntity> {
    private logger;
    getMemosByFilter(memosFilterDto: MemosFilterDto): Promise<any>;
    createMemo(createMemoDto: CreateMemoDto, createdBy: number): Promise<MemoDto>;
    updateMemo(updateMemoDto: UpdateMemoDto, memoId: string): Promise<MemoDto>;
}
