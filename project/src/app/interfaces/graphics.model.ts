export interface Graphics{
    id:number,
    name:string,
    imageUrl:string,
    rating:number,
    commentsCount:number,
    chipset: string,
    memory: number,
    coreClock: number,
    boostClock: number,
    color: string;
    length: number,
    favourites:boolean
}
export interface GraphicsPost{
    id?:number,
    name:string,
    imageUrl:string,
    chipset: string,
    memory: number,
    coreClock: number,
    boostClock: number,
    color: string;
    length: number,
}