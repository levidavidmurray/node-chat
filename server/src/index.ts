import cors from "cors";
import mongoose from "mongoose";
import express, { Express } from "express";
import bodyParser from "body-parser";
import { Server as HttpServer } from "http";

import Director from "./Director";

const isProduction = process.env.NODE_ENV === "production";

// Initialize express & middleware
const app: Express = express();

app.use(cors());

// Express config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/chatdb");
mongoose.set("debug", true);
//
import "./models/User";
import "./config/passport";
import routes from "./routes";

app.use(routes);

app.use((req, res, next) =>
{
	const err = new Error("Not Found");
	// @ts-ignore
	err.status = 404;
	next(err);
});

// app.get("/", (req: Request, res: Response) => {
// 	res.sendFile(path.resolve(__dirname, "../../client/index.html"));
// });

// Initialize Http server & socket connection
const http: HttpServer = new HttpServer(app);
// new Director(http);

// Start server
http.listen(3000, () =>
{
	console.log("Listening on *:3000");
});
