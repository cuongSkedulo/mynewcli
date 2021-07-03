import express from "express";
import Command from "@oclif/command";
import open from "open";
import passport from "passport";
import session from "express-session";

export class MyCommand extends Command {
  static description = "description of this example command";

  async run() {
    const app = express();
    const port = 3000;

    var userProfile: any;

    app.use(
      session({
        resave: false,
        saveUninitialized: true,
        secret: "SECRET",
      })
    );

    var server = app.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/success', (req, res) => {
      res.render('pages/success', {user: userProfile});
    });
    app.get('/error', (req, res) => res.send("error logging in"));
     
    passport.serializeUser(function(user, cb) {
      cb(null, user);
    });
     
    passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
    });

    var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
    const GOOGLE_CLIENT_ID =
      "564225158115-mps0cifan4iu33k6con3qrl7cf8e6knr.apps.googleusercontent.com";
    const GOOGLE_CLIENT_SECRET = "mpOA2NTHj0odUev77SbbBUz8";

    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:3000/auth/google/callback",
        },
        function (
          accessToken: any,
          refreshToken: any,
          profile: any,
          done: any
        ) {
          console.log(accessToken);
          server.close();
          return done(null, userProfile);
        }
      )
    );

    app.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get(
      "/auth/google/callback",
      passport.authenticate(
        "google", 
        { successRedirect: '/',
        failureRedirect: '/error',
        failureFlash: true }
      )
    );

    await open("http://localhost:3000/auth/google");
  }
}
