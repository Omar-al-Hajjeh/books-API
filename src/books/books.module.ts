
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorModule } from '../author/author.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    AuthorModule 
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}


