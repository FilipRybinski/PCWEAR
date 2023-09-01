import { category } from "./category.model";

export interface threadAdd {
    title: string;
    description: string;
    categories: category[];
}