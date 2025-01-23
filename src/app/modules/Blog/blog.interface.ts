/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TBlog {
    title: string;
    content: string;
    author: Types.ObjectId;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface PopulatedBlog {
    title: string;
    content: string;
    author: {
        name: string;
        email: string;
    }
}

export interface BlogModel extends Model<TBlog> {
    isBlogExistCheckById(id: string): Promise<PopulatedBlog>
}
