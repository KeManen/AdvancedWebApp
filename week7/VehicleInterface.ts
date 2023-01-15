export interface IVehicle {
    "model": string,
    "color": string,
    "year": number,
    "power": number
}

export class Vehicle implements  IVehicle{
    "model": string;
    "color": string;
    "year": number;
    "power": number;
}
export class Car implements IVehicle{
    "model": string;
    "color": string;
    "year": number;
    "power": number;
    "bodyType" : string;
    "wheelCount": number;
}
export class Boat implements IVehicle{
    "model": string;
    "color": string;
    "year": number;
    "power": number;
    "draft": number;
}
export class Plane implements IVehicle{
    "model": string;
    "color": string;
    "power": number;
    "year": number;
    "wingspan": number;
}