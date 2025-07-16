import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from './author.schema';


@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<AuthorDocument>) { }
  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const created = new this.authorModel(createAuthorDto);
    const result = await created.save();
    return created;

  }

  async findAll(): Promise<Author[]> {
    const authors = await this.authorModel.find().exec();
    return authors.map(author => this.toAuthor(author))
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorModel.findById(id).exec();
    if (author === null) throw new NotFoundException('Author Not found');
    return this.toAuthor(author);
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorModel.findByIdAndUpdate(id, updateAuthorDto, { new: true }).exec();
    if (author === null) throw new NotFoundException('Author Not found');
    return this.toAuthor(author);
  }

  async remove(id: string): Promise<void> {
    const result = await this.authorModel.findByIdAndDelete(id).exec();
    if (result === null) throw new NotFoundException('author Not Found');

  }
  private toAuthor(author: AuthorDocument): Author {
    return {
      name: author.name,
    };
  }
}
