import { Body, Controller, Get, Headers, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMemoDto } from './dto/create.dto';
import { MemosFilterDto } from './dto/memos-filter.dto';
import { UpdateMemoDto } from './dto/update.dto';
import { MemoService } from './memo.service';

@Controller('memos')
export class MemoController {
    constructor(private memoService: MemoService) {}

    @UseGuards(AuthGuard())
    @Get('/')
    getMeMosByFilter(@Headers() headers, @Query(ValidationPipe) memosfilterDto: MemosFilterDto): Promise<any> {
        return this.memoService.getMemosByFilter(headers, memosfilterDto);
    }

    @UseGuards(AuthGuard())
    @Post('/')
    createMemo(@Headers() headers, @Body(ValidationPipe) createMemoDto: CreateMemoDto): Promise<any> {
        return this.memoService.createMemo(headers, createMemoDto);
    }

    @UseGuards(AuthGuard())
    @Put('/:memoId')
    updateMemo(@Body(ValidationPipe) updateMemoDto: UpdateMemoDto, @Param('memoId') memoId): Promise<any> {
        return this.memoService.updateMemo(updateMemoDto, memoId);
    }
}
