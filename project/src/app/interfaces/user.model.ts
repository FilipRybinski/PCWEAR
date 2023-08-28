import { post } from "./post.model";
import { privateDetail } from "./privateDetail.model";
import { role } from "./role.model";
import { thread } from "./thread.model";

export interface user {
    id?: number;
    userName?: string;
    userPassword?: string;
    email?: string;
    roleId?: number;
    role?: role;
    personalData?: privateDetail;
    threads?: thread[];
    posts?: post[];
}