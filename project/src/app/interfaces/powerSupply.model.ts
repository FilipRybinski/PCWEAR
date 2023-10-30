export interface PowerSupply{
    id:number,
    name:string,
    imageUrl:string,
    rating:number,
    commentsCount:number
    type: string;
    efficiency: string;
    wattage: number;
    modular: string;
    color: string;
    favourites:boolean
}