import * as mongoose from "mongoose";
import { prop, Typegoose, ModelType, InstanceType, instanceMethod } from "typegoose";
import crypto from "crypto";
import { sign } from "jsonwebtoken";
import { secret } from "../config";
import { UserAuthJSON } from "../types";

export class User extends Typegoose {
	@prop({ lowercase: true, unique: true, index: true })
	username: string;
	@prop({ lowercase: true, unique: true, index: true })
	email: string;
	@prop()
	hash: string;
	@prop()
	salt: string;
	@prop()
	token: string;

	/**
	 * Instance Methods
	 */
	@instanceMethod
	authenticate(this: InstanceType<User>, password: string): boolean
	{
		const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
		return this.hash === hash;
	}

	@instanceMethod
	setPassword(this: InstanceType<User>, password: string): void
	{
		this.salt = crypto.randomBytes(16).toString("hex");
		this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
	}

	@instanceMethod
	generateJWT(this: InstanceType<User>): string
	{
		const today: Date = new Date();
		const exp: Date = new Date(today);
		exp.setDate(today.getDate() + 60);

		return sign({
			id: this._id,
			username: this.username,
			exp: exp.getTime() / 1000
		}, secret);
	}

	@instanceMethod
	toAuthJSON(this: InstanceType<User>): UserAuthJSON
	{
		return {
			id: this.id,
			username: this.username,
			email: this.email,
			token: this.token
		};
	}
}

export const UserModel = new User().getModelForClass(User);
