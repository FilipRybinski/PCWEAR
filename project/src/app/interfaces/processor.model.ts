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