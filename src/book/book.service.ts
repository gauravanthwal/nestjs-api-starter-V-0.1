import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await this.bookModel.find({ ...keyword });
    return books;
  }

  async create(book: Book, user: User): Promise<Book> {

    const data = Object.assign(book, {user: user._id})
    const res = await this.bookModel.create(data);
    return res;
  }

  async findBookById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBookById(id: string, book: Book): Promise<Book> {
    const res = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });

    return res;
  }
  async deleteBookById(id: string): Promise<Book> {
    const res = await this.bookModel.findByIdAndDelete(id);

    return res;
  }
}
