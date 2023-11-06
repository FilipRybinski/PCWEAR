export interface Processor{
    id:number,
    name:string,
    imageUrl:string,
    rating:number,
    commentsCount:number
    cores: number;
    threads: number;
    graphics: boolean;
    tdp: number;
    socket: string;
    favourites:boolean
}
export interface ProcessorPost{
    id?:number,
    name:string,
    imageUrl:string,
    cores: number;
    threads: number;
    graphics: boolean;
    tdp: number;
    socket: string;
}