import mongoose from "mongoose";
import passport from "passport";
import { Router } from "express";
import { User, UserModel } from "../../models/User";
import auth from "../auth";

const router = Router();

/**
 * @GET -- /user
 * @description: Retrieves a single user by id
 */
router.get("/user/:id", (req: any, res: any, next) => {
	UserModel.findById(req.params.id)
		.then((user: User) => {
			if (!user) { return res.sendStatus(401); }

			return res.json({ user: user.toAuthJSON() });
		})
		.catch((err) => {
			console.log(err);
		});
});

/**
 * @PUT -- /user
 */
router.put("/user", auth.required, (req: any, res: any, next) => {
	UserModel.findById(req.payload.id).then((user: User) => {
		if (!user) { return res.sendStatus(401); }
	});
});

/**
 * @POST -- /users/login
 * @description: Log a user in, and return User JWT
 */
router.post("/users/login", (req: any, res: any, next) => {
	if (!req.body.user.email) {
		return res.status(422).json({errors: {email: "can't be blank"}});
	}

	if (!req.body.user.password) {
		return res.status(422).json({errors: {password: "can't be blank"}});
	}

	passport.authenticate("local", { session: false }, (err, user: User, info) => {
		if (err) { return next(err); }

		if (user)
		{
			user.token = user.generateJWT();
			return res.json({ user: user.toAuthJSON() });
		}
		else
		{
			return res.status(422).json(info);
		}
	})(req, res, next);
});

/**
 * @POST -- /users
 * @description: Create a new User
 */
router.post("/users", (req, res, next) => {

	console.log(req.body);
	const user = new User();

	user.username = req.body.user.username;
	user.email = req.body.user.email;
	user.setPassword(req.body.user.password);

	const u = new UserModel(user);
	u.save()
		.then((val) => {
			console.log(val);
			console.log(u);

			UserModel.findOne()
				.then(user => console.log(user));
		});
});

export default router;
