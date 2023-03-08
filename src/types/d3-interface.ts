export type DataType = {
    date: string;
    value: number;
    name: string;
};

export interface CountryData {
    info: {
        Area: number;
        Capital: string;
        Date_created: string;
        DeputyGovernor: string;
        Governor: string;
        Latitude: string | number;
        Longitude: string | number;
        Number_of_LGAS: number;
        Population: number;
        Slogan: string;
        Wegsite: string;
        officialName: string;
    };
    Name: string;
}

export interface CountryData2 {
    info: {
        Area: number;
        Capital: string;
        Date_created: string;
        DeputyGovernor: string;
        Governor: string;
        Latitude: number;
        Longitude: number;
        Number_of_LGAS: number;
        Population: number;
        Slogan: string;
        Wegsite: string;
        officialName: string;
    };
    Name: string;
}
