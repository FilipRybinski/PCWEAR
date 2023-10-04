import { category } from "./category.model";
import { categoryAdd } from "./categoryAdd.model";

export interface threadAdd {
    title: string;
    description: string;
    categories: categoryAdd[];
}