import express, {Express, Request, Response} from "express"
import {vehicleRouter} from "./VehicleRouter";
import bodyParser from "body-parser";

const app: Express = express()
const port: number = 3000

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(jsonParser);
app.use(urlencodedParser);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from TS-Express application – I am up and RUNNING!!");
})

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello World");
})
app.use("/vehicle", vehicleRouter)

app.listen(port, () => {
    console.log("Server is up'n'running at http://localhost:" + port)
})