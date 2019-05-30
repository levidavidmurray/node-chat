import passport from "passport";
import { Router } from "express";
import { User, UserModel } from "../../models/User";
import auth from "../auth";

const router = Router();

/**
 * @GET -- /user
 * @auth: True
 * @description: Retrieves a single user by id
 */
router.get("/user/:id", auth.required, (req: any, res: any, next) => {
	UserModel.findById(req.params.id)
		.then((user: User) => {
			if (!user) { return res.sendStatus(401); }

			return res.json({ user: user.toAuthJSON() });
		})
		.catch(next);
});

/**
 * @PUT -- /user
 * @auth: True
 */
router.put("/user/:id", auth.required, (req: any, res: any, next) => {
	UserModel.findById(req.params.id).then((user: User) => {
		if (!user) { return res.sendStatus(401); }

		if (typeof req.body.user.username !== "undefined")
		{
			user.username = req.body.user.username;
		}

		if (typeof req.body.user.email !== "undefined")
		{
			user.email = req.body.user.email;
		}

		if (typeof req.body.user.password !== "undefined")
		{
			user.setPassword(req.body.user.password);
		}

		return UserModel(user).save()
			.then(() => {
				return res.json({user: user.toAuthJSON()});
			}).catch(next);
	});
});

/**
 * @POST -- /users/login
 * @email: String
 * @password: String
 * @auth: False
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
 * @auth: False
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
