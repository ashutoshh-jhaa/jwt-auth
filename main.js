import express from "express";
import router from "./routes/index.js";
import passport from "./config/passport-jwt.js";

const PORT = 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));

// Initialize Passport middleware (loads configured strategies)
app.use(passport.initialize());

// Mount routes
app.use("/", router);

// Start server
app.listen(PORT, "localhost", (error) => {
  error
    ? console.log(error)
    : console.log(`Server is listening on localhost:${PORT}`);
});
