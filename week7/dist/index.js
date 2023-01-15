"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const VehicleRouter_1 = require("./VehicleRouter");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
let jsonParser = body_parser_1.default.json();
let urlencodedParser = body_parser_1.default.urlencoded({ extended: true });
app.use(jsonParser);
app.use(urlencodedParser);
app.get("/", (req, res) => {
    res.send("Hello from TS-Express application – I am up and RUNNING!!");
});
app.get("/hello", (req, res) => {
    res.send("Hello World");
});
app.use("/vehicle", VehicleRouter_1.vehicleRouter);
app.listen(port, () => {
    console.log("Server is up'n'running at http://localhost:" + port);
});
