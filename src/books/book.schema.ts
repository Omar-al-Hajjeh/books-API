import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Author } from 'src/author/author.schema';

export type BookDocument = Book & Document;

@Schema({ collection: 'books' })
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({
        type: Object,
        required: true,
    })
    author: {
        name: string;
        id: string;
    };
}
    

export const BookSchema = SchemaFactory.createForClass(Book);
