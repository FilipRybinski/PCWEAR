import { Part } from "./part.model";

export interface Recommended{
    date:string,
    user:string,
    pathUserImage:string,
    roleId:number,
    parts:Part[]
}