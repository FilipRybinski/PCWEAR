
export interface Part{
    id:number,
    name:string,
    imageUrl:string,
    rating:number,
    commentsCount:number
    type?: string;
    efficiency?: string;
    wattage?: number;
    modular?: string;
    color?: string;
    cores?: number;
    threads?: number;
    graphics?: boolean;
    tdp?: number;
    socket?: string;
    rpmLower?: number;
    rpmUpper?: number;
    noiseLower?: number;
    noiseUpper?: number;   
    size?: number;
    formFactor?: string;
    maxMemory?: number;
    memorySlot?: number;
    speed?: number;
    modulesLower?: number;
    modulesUpper?: number;  
    cl?: number;
    capacity?: number;
    cache?: number; 
    interfaces?: string;
    chipset?: string;
    memory?: number; 
    coreClock?: number;
    boostClock?: number;   
    length?: number;
    sidePanel?: string;
    externalVolume?: number;
    favourites:boolean
}