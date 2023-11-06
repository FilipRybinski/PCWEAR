export interface HardDrive{
    id:number,
    name:string,
    imageUrl:string,
    rating:number,
    commentsCount:number
    capacity: number;
    type: string;
    cache: number; 
    interfaces: string;
    favourites:boolean
}
export interface HardDrivePost{
    id?:number,
    name:string,
    imageUrl:string,
    capacity: number;
    type: string;
    cache: number; 
    interfaces: string;
}