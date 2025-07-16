import { Prop,SchemaFactory,Schema } from "@nestjs/mongoose";
import { Collection, Document } from "mongoose";
export type AuthorDocument =  Document & Author;
@Schema({collection : 'author'}) 

export class Author{
    @Prop({required : true})
    name : string;


}

export const AuthorSchema = SchemaFactory.createForClass(Author);