export interface Motherboard{
    id:number,
    name:string,
    imageUrl:string,
    rating:number,
    commentsCount:number
    socket:string,
    formFactor:string,
    maxMemory:number,
    memorySlot:number,
    color:string,
    favourites:boolean
}
export interface MotherboardPost{
    id?:number,
    name:string,
    imageUrl:string,
    socket:string,
    formFactor:string,
    maxMemory:number,
    memorySlot:number,
    color:string,
}