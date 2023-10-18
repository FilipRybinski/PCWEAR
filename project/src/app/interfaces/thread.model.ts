import { category } from "./category.model";
import { postThread } from "./postThread.model";
export interface thread {
    id: number;
    title: string;
    description: string;
    createDate: string;
    postsNumber: number;
    user: string;
    categories: category[];
    likes:number;
    accepted:boolean;
    dislikes:number;
    roleId:number;
    views:number;
    posts:postThread[];
    currentLike:number
    pathUserImage:string
}