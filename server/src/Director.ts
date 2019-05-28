import {Server, Socket} from "socket.io";

class Director {
	server: Server;

	constructor(server: Server)
	{
		this.server = server;

		server.on("connection", (socket: Socket) => {
			console.log("Connected: " + socket.id);

			socket.on("disconnect", () => {
				console.log("Disconnected: " + socket.id);
			});

			socket.on("MESSAGE", (message) => {
				socket.broadcast.emit("MESSAGE", message);
			});

			socket.on("TYPING", () => {
				socket.broadcast.emit("TYPING", true);
			});
		});
	}
}

export default Director;
