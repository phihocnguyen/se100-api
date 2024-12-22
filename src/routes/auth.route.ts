import { Router } from "express";
import passport from "passport";

const CLIENT_URL = "http://localhost:5173/";

class AuthRoute {
  public readonly router: Router;

  constructor() {
    this.router = Router();
    // get token -> headers -> http request -> decode -> req.user = json -> user controller createOAuth
    this.router.get("/login/success", (req, res) => {
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: req.user,
        // optionally send cookies
      });
    });

    this.router.get("/login/failed", (req, res) => {
      res.status(401).json({
        success: false,
        message: "Login failed",
      });
    });

    this.router.get("/logout", (req, res) => {
      req.logout((error) => {
        throw new Error(error as string);
      });
      res.redirect(CLIENT_URL);
    });

    this.router.get("/google", passport.authenticate("google"));

    this.router.get(
      "/google/callback",
      passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
      })
    );
  }
}

export default AuthRoute;
