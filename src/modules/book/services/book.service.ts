import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from '../repositories/book.repository';
import { UserRepository } from '../../user/repositories/user.repository';
import { Book } from '../entities/book.entity';
import { status } from '../../../shared/entity-status.num';
import { ReadBookDto } from '../dto/read-book.dto';
import { plainToClass } from 'class-transformer';
import { CreateBookDto } from '../dto/create-book.dto';
import { In, UpdateResult } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { RoleType } from '../../role/roletype.enum';
import { Role } from '../../role/entities/role.entity';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly _bookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async getBookID(id: number): Promise<ReadBookDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const book: Book = await this._bookRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!book) {
      throw new NotFoundException('User does not found');
    }

    return plainToClass(ReadBookDto, book);
  }

  async getBooks(): Promise<ReadBookDto[]> {
    const books: Book[] = await this._bookRepository.find({
      where: { status: status.ACTIVE },
    });

    return books.map((book: Book) => plainToClass(ReadBookDto, book));
  }

  async getBookByAuthor(id: number): Promise<ReadBookDto[]> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const books = await this._bookRepository.find({
      where: { status: status.ACTIVE },
    });
    // , authors: In([id])

    return books.map((book) => plainToClass(ReadBookDto, book));
  }

  async createBook(book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    const authors: User[] = [];

    for (const authorId of book.authors) {
      const authorExists = await this._userRepository.findOne(authorId, {
        where: { status: status.ACTIVE },
      });

      if (!authorExists) {
        throw new NotFoundException('author does not found');
      }

      const isAuthor = authorExists.roles.some(
        (role: Role) => role.name === RoleType.AUTHOR,
      );

      if (!isAuthor) {
        throw new UnauthorizedException('Is not an author');
      }

      authors.push(authorExists);
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      authors,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async createBookByAuthor(
    book: Partial<CreateBookDto>,
    id: number,
  ): Promise<ReadBookDto> {
    const author = await this._userRepository.findOne(id, {
      where: { status: status.INACTIVE },
    });

    const isAuthor = author.roles.some(
      (role: Role) => role.name === RoleType.AUTHOR,
    );

    if (!isAuthor) {
      throw new UnauthorizedException('is not an author');
    }

    const savedBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      author,
    });

    return plainToClass(ReadBookDto, savedBook);
  }

  async updateBook(
    bookId: number,
    book: UpdateBookDto,
    authorId: number,
  ): Promise<ReadBookDto> {
    console.log(bookId);
    console.log(authorId);
    console.log();
    const bookExist: Book = await this._bookRepository.findOne(bookId, {
      where: { status: status.ACTIVE },
    });

    if (!bookExist) {
      throw new NotFoundException('The book does not exists');
    }

    bookExist.name = book.name;
    bookExist.description = book.description;

    const isOwnBook = bookExist.authors.some(
      (author) => author.id === authorId,
    );

    if (!isOwnBook) {
      throw new NotFoundException('The user is not hte book author');
    }

    const bookUpdated = await this._bookRepository.save(bookExist);

    return plainToClass(ReadBookDto, bookUpdated);
  }

  async deleteBook(id: number): Promise<UpdateResult> {
    const bookExist: Book = await this._bookRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!bookExist) {
      throw new NotFoundException('The user could not be found');
    }

    return await this._bookRepository.update(id, { status: status.INACTIVE });
  }
}
