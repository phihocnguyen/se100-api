import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserRepository from "../repositories/user.repository";
import CustomerRepository from "../repositories/customer.repository";
import { User } from "@prisma/client";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const userRepository = new UserRepository();
      const existUser = await userRepository.findByEmail(
        profile._json.email as string
      );
      if (!existUser) {
        const customerRepository = new CustomerRepository();
        const userData = {
          email: profile._json.email,
          password: profile._json.email,
          isOAuth: true,
          role: "CUSTOMER",
          image: profile._json.picture,
        };
        const newUser: any = await userRepository.createOAuth(userData);
        const customerData = {
          fullName: profile._json.name,
          userId: newUser.id,
        };
        const newCustomer = await customerRepository.create(customerData);
        console.log(newCustomer);
      }
      done(null, profile);
    }
  )
);

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const userRepository = new UserRepository();
    // const user = await userRepository.findById(id);
    done(null, id);
  } catch (error) {
    done(error, null);
  }
});
