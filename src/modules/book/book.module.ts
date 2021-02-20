import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './repositories/book.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRepository, UserRepository]),
    AuthModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
