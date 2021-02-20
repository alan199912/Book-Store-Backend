import { EntityRepository, Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

// * entity of bd
// * interact with bd
@EntityRepository(Book)
export class BookRepository extends Repository<Book> {}
