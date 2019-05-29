import jwt from "express-jwt";
import { Request } from "express";
import { secret } from "../config";

function getTokenFromHeader(req: Request)
{
	if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Token" ||
			req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer")
	{
		return req.headers.authorization.split(" ")[1];
	}

	return undefined;
}

const auth = {
	required: jwt({
		secret: secret,
		userProperty: "payload",
		getToken: getTokenFromHeader
	}),
	optional: jwt({
		secret: secret,
		userProperty: "payload",
		credentialsRequired: false,
		getToken: getTokenFromHeader
	})
};

export default auth;
