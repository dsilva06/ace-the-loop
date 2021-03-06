// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
const projectName = "Ace The Loop";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

// 👇 Start handling routes here
const index = require("./routes/index");
const user = require("./routes/user");
const scoresheet = require("./routes/scoresheet");
const weather = require("./routes/weather");

const session = require("express-session");
const MongoStore = require("connect-mongo");


app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 600000,
      },
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost/ace-the-loop",
        ttl: 600000,
      }),
    })
  );


app.use("/", index);
app.use("/user", user);
app.use("/scoresheet", scoresheet);
app.use("/weather", weather);





const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
