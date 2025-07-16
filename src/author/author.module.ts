import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])
  ],
  exports: [MongooseModule]
})
export class AuthorModule {}
