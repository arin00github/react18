export interface Feature {
    geometry: {
        coordinates: number[][];
        type: "MultiPolygon";
        id: string;
    };
    properties: [id: string][];
    type: "Feature";
}

export interface FeatureCollection {
    features: Feature[];
    type: "FeatureCollection";
}
