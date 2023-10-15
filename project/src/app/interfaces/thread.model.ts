import { category } from "./category.model";
export interface thread {
    id: number;
    title: string;
    description: string;
    createDate: string;
    posts: number;
    user: string;
    categories: category[];
    likes:number;
    accepted:boolean;
    dislikes:number;
    views:number;
    currentLike:number
    pathUserImage:string
}