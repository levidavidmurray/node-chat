// Server initialization
import express, {Request, Response} from "express";
import Director from "./Director";
import * as path from "path";
import {Server} from "socket.io";

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);

// Bind socket.io to our http server
const io: Server = require("socket.io")(http, {
	path: "/chat"
});
const socketDirector: Director = new Director(io);

app.get("/", (req: Request, res: Response) =>
{
	res.sendFile(path.resolve(__dirname, "../../client/index.html"));
});

http.listen(3000, () =>
{
	console.log("Listening on *:3000");
});
