const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
require("dotenv").config();

const PORT = process.env.PORT || 3000;
//passport config
require("./passport")(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "html");
app.use(express.static(path.join("src", "static")));

// session middleware
app.use(
  session({
    secret: "Jihad",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // Passing the user
  res.locals.user = req.user;

  next();
});

// Configure Nunjucks settings
nunjucks.configure(["src/views/", "src/static/"], {
  autoescape: false,
  express: app,
});

// define the application routes
app.use("/", require("../routes/HomeRoute"));
app.use("/document", require("../routes/DocumentRoute"));
app.use("/auth", require("../routes/AuthRoute"));

module.exports.app = app;
// module.exports.io = io;
