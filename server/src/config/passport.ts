import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User, UserModel } from "../models/User";

const localStrategy = new LocalStrategy(
	{
		usernameField: "user[email]",
		passwordField: "user[password]"
	},
	function (email, password, done)
	{
		UserModel.findOne({ email: email })
			.then((user: User) => {
				if (!user || !user.authenticate(password))
				{
					return done(undefined, false, {errors: {"email or password": "is invalid"}});
				}

				return done(undefined, user);
			}).catch(done);
	}
);

passport.use(localStrategy);
