import { thread } from "./thread.model";
import { user } from "./user.model";

export interface post {
    id?: number;
    threadId?: number;
    userId?: number;
    createdDate?: string;
    title?: string;
    body?: string;
    thread?: thread;
    user?: user;
}