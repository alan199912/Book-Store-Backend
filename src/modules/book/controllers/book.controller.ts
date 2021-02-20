import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { response, Response } from 'express';
import { ReadBookDto } from '../dto/read-book.dto';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { GetUser } from '../../auth/decorator/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @UseGuards(AuthGuard())
  @Get(':id')
  getBookId(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): void {
    this._bookService
      .getBookID(id)
      .then((book: ReadBookDto) => {
        if (!book) {
          throw new Error('The book could not be found');
        }
        return response.status(HttpStatus.OK).json({
          status: 'success',
          book,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @UseGuards(AuthGuard())
  @Get()
  getBooks(@Res() response: Response): void {
    this._bookService
      .getBooks()
      .then((books: ReadBookDto[]) => {
        if (!books) {
          throw new Error('No books founds');
        }

        return response.status(HttpStatus.OK).json({
          status: 'success',
          books,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @UseGuards(AuthGuard())
  @Get('author/:id')
  getBookByAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): void {
    this._bookService
      .getBookByAuthor(id)
      .then((books: ReadBookDto[]) => {
        if (!books) {
          throw new Error('No books founds');
        }

        return response.status(HttpStatus.OK).json({
          status: 'success',
          books,
        });
      })
      .catch((error) => {
        console.log(error);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @UseGuards(AuthGuard())
  @Post()
  createBook(
    @Body() book: Partial<CreateBookDto>,
    @Res() response: Response,
  ): void {
    this._bookService
      .createBook(book)
      .then((book: ReadBookDto) => {
        return response.status(HttpStatus.CREATED).json({
          status: 'success',
          book,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Post()
  createBookByAuthor(
    @Body() book: Partial<CreateBookDto>,
    @GetUser('id') authorId: number,
  ): void {
    this._bookService
      .createBookByAuthor(book, authorId)
      .then((book: ReadBookDto) => {
        return response.status(HttpStatus.CREATED).json({
          status: 'success',
          book,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  updateBook(
    @Param('id', ParseIntPipe) bookId: number,
    @Body() book: UpdateBookDto,
    @GetUser('id') authorId: number,
    @Res() response: Response,
  ): void {
    this._bookService
      .updateBook(bookId, book, authorId)
      .then(() => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'Book update successfully',
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  deleteBook(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): void {
    this._bookService
      .deleteBook(id)
      .then(() => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'Book delete successfully',
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }
}
