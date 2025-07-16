import { Controller, Get, Post, Put, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './book.dto';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get('search')
        searchByName(@Query('name') name : string , @Param(':id') id : string) {
        return this.booksService.searchByName(name);
        }
    @Get()
    getAll() : Promise<BookDto[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.booksService.findOne(id);
    }

    @Post(':AuthorId')
    create(@Body()createdBookDot : {title : string} ,@Param('AuthorId') id : string) {
        return this.booksService.create(createdBookDot.title,id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: BookDto) {
        
        return this.booksService.update(id, body);
    }

    @Patch(':id')
    patch(@Param('id') id: string, @Body() body: { title?: string , author : {name?: string} }) {
        return this.booksService.patch(id,body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.booksService.delete(id).then(() => ({
            message: 'Book deleted successfully',
        }));
    }
}