import { thread } from "./thread.model";

export interface category {
    id: number;
    name: string;
    bgColor: string;
    color: string;
    threads: thread[];
}