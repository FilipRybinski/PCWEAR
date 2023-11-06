export interface Memory{
    id:number,
    name:string,
    imageUrl:string,
    rating:number,
    commentsCount:number
    speed: number;
    modulesLower: number;
    modulesUpper: number;  
    color:string,
    cl: number;
    favourites:boolean
}
export interface MemoryPost{
    id?:number,
    name:string,
    imageUrl:string,
    speed: number;
    modulesLower: number;
    modulesUpper: number;  
    color:string,
    cl: number;
}