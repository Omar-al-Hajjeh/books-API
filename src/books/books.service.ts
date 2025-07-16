import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { BookDto } from './book.dto';
import { Author, AuthorDocument } from 'src/author/author.schema';


@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>,
@InjectModel(Author.name) private authorModel: Model<AuthorDocument>) { }

    async findAll(): Promise<BookDto[]> {
        const books = await this.bookModel.find().exec();
        return books.map(book => this.toDto(book));
    }

    async findOne(id: string): Promise<BookDto> {
        const book = await this.bookModel.findById(id).exec();
        if (!book) throw new NotFoundException('Book Not Found');
        return this.toDto(book);
    }

    async create( title : string, id: string ): Promise<BookDto> {
        const myauthor = await this.authorModel.findById(id).exec()
        if (myauthor === null) throw new NotFoundException('create Author first');

        const created = new this.bookModel({title : title,
            author:{
                name : myauthor.name,
                id :id
            }
        });
        const result = await created.save();
        return this.toDto(result);
    }

    async update(id: string, data: BookDto): Promise<BookDto> {
        const book = await this.bookModel.findByIdAndUpdate(id, data).exec();
        if (!book) throw new NotFoundException('Book Not Found');
        return this.toDto(book);
    }

    async patch(id: string, data : { title?: string , author : {name?: string} }): Promise<BookDto> {
        const book = await this.bookModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!book) throw new NotFoundException('Book Not Found');
        return this.toDto(book);

    }

    async delete(id: string): Promise<void> {
        const result = await this.bookModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Book Not Found');
    }
    async searchByName(keyword: string): Promise<BookDto[]> {
        const books = await this.bookModel.find({
            'author.name': { $regex: keyword, $options: 'i' }
        });;
        return books.map(book => this.toDto(book));

    }

    private toDto(book: BookDocument): BookDto {
        return {
            title: book.title,
            author: {
                name: book.author.name,
            }
        };
    }
}
