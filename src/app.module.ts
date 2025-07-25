import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
;

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/library'),
    BooksModule,
    AuthorModule,
    AuthModule,
    UsersModule,
  ],
  providers: [UsersService],
})
export class AppModule {}
