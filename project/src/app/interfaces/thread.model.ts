import { category } from "./category.model";
export interface thread {
    id?: number;
    title?: string;
    description?: string;
    createDate?: string;
    posts?: number;
    user?: string;
    categories?: category[];
    likes?:number;
    dislikes?:number;
    currentLike?:number
}