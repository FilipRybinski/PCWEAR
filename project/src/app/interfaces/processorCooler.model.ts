export interface processorCooler{
    id:number,
    name:string,
    imageUrl:string,
    rating:number,
    commentsCount:number,
    rpmLower: number,
    rpmUpper: number,
    noiseLower: number,
    noiseUpper: number,
    size: number,
    favourites:boolean
}
export interface processorCoolerPost{
    id?:number,
    name:string,
    imageUrl:string,
    rpmLower: number,
    rpmUpper: number,
    noiseLower: number,
    noiseUpper: number,
    size: number,
}