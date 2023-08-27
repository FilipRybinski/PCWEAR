import { ThreadCategory } from "./threadCategory.model";

export interface newThread {
    title: string;
    description: string;
    threadCategories: ThreadCategory[]
}