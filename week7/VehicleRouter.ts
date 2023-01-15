import {Request, Response, Router} from "express";
import {IVehicle, Vehicle, Car, Plane, Boat} from "./VehicleInterface";

export const vehicleRouter = Router();

const vehicles : IVehicle[] = [];

vehicleRouter.get("/search/:model", (req: Request<{model : string}>, res :Response) => {
    console.log("param model:" + JSON.stringify(req.params?.model));
    console.log(vehicles)

    let foundVehicle = vehicles?.find(s => s.model === req.params?.model);
    console.log(JSON.stringify(foundVehicle));
    if(foundVehicle === undefined) {
        return res.sendStatus(200);
    }

    res.send(foundVehicle);
});

vehicleRouter.post("/add", (req: Request, res: Response) => {
    console.log("post with" + JSON.stringify(req.body));
    let vehicle :IVehicle;

    if(req.body.wingspan) {
        let plane = new Plane();
        plane.model = req.body.model;
        plane.color = req.body.color;
        plane.year = req.body.year;
        plane.power = req.body.power;
        plane.wingspan = req.body.wingspan;
        vehicle = plane;
    }
    else if (req.body.draft){
        let boat = new Boat();
        boat.model = req.body.model;
        boat.color = req.body.color;
        boat.year = req.body.year;
        boat.power = req.body.power;
        boat.draft = req.body.draft;
        vehicle = boat;
    }
    else if (req.body.bodyType && req.body.wheelCount){
        let car = new Car();
        car.model = req.body.model;
        car.color = req.body.color;
        car.year = req.body.year;
        car.power = req.body.power;
        car.bodyType = req.body.bodyType;
        car.wheelCount = req.body.wheelCount;
        vehicle = car;
    }
    else {
        vehicle = new Vehicle();
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;
        vehicle.year = req.body.year;
        vehicle.power = req.body.power;
    }

    vehicles.push(vehicle);
    res.status(201)
    res.send("Vehicle added")
    console.log(vehicles);
});
