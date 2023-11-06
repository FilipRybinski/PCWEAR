export interface Case{
    id:number,
    name:string,
    imageUrl:string,
    rating:number,
    commentsCount:number,
    type: string,
    color: string,
    sidePanel: string,
    externalVolume: number,
    favourites:boolean
}
export interface CasePost{
    id?:number,
    name:string,
    imageUrl:string,
    type: string,
    color: string,
    sidePanel: string,
    externalVolume: number,
}