// Server initialization
import cors from "cors";
import express, { Request, Response } from "express";
import * as path from "path";
import { Server } from "socket.io";

import Director from "./Director";

const app = express();
app.use(cors);

const http = require("http").Server(app);

// Bind socket.io to our http server
const io: Server = require("socket.io")(http, { path: "/chat" });
const socketDirector: Director = new Director(io);

app.get("/", (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, "../../client/index.html"));
});

http.listen(3000, () => {
	console.log("Listening on *:3000");
});
