import { thread } from "./thread.model";

export interface editState{
    id:number;
    thread:thread
    from:boolean;
    to:boolean;
}