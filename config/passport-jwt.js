import { configDotenv } from "dotenv";
configDotenv({ quiet: true });

import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

// Sample users (replace with DB in real app)
export const users = [
  { id: 1, username: "ashutosh", password: "1234" },
  { id: 2, username: "john", password: "123" },
];

// JWT strategy options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header as Bearer token
  secretOrKey: process.env.JWT_SECRET_KEY,
  // issuer, audience, algorithms etc can be added for stricter validation
};

// JWT Strategy: runs on protected routes to validate token and extract user info
passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    // Find user by ID from token payload
    const user = users.find((u) => u.id === jwtPayload.id);
    if (user) {
      console.log("User found in JWT strategy");
      return done(null, user); // success, attach user to req.user
    } else {
      console.log("User not found in JWT strategy");
      return done(null, false); // failure, no user found
    }
  }),
);

export default passport;
