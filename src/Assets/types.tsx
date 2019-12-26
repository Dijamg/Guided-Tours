export type Poi = {
    id: number,
    BuildingId: number,
    title: string,
    floor: number,
    description: string,
    imgUrl: string,
    location:{xm: number, ym:number}
}

type baseMap = {
    floor: number,
    map: string
} 

export type Building = {
    id: number,
    name: string,
    imgUrl: string,
    description: string
    //Maps a floor number to a base map
    baseMaps: Array<baseMap>
}

export type Operators = {
    buildings: Building[],
    setBuildings: (arg0: React.SetStateAction<Building[]>) => void,
    tours: Tour[],
    setTours: (arg0: React.SetStateAction<Tour[]>) => void,
    pois: Poi[],
    setPois: (arg0: React.SetStateAction<Poi[]>) => void
}

export type Tour = {
    id: number,
    name: string,
    imgUrl: string,
    description: string
    //Maps a floor number to a base map
    POIs: Array<Poi>
}







