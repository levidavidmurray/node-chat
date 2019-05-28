import {Server, Socket} from "socket.io";

class Director {
	server: Server;

	constructor(server: Server)
	{
		this.server = server;

		server.on("connection", (socket: Socket) => {
			console.log("A user connected!");
			console.log(socket);
		});
	}
}

export default Director;
