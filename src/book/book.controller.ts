import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @UseGuards(AuthGuard())
  @Get('')
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post('new')
  @UseGuards(AuthGuard())
  async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findBookById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async updateById(
    @Param('id') id: string,
    @Body() book: UpdateBookDto
  ): Promise<Book> {
    return this.bookService.updateBookById(id, book);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteBookById(id);
  }
}
