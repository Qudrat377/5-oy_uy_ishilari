const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
const errorMiddleware = require("./middleware/error.middleware");
const AuthRouter = require("./router/auth.routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const CitationRouter = require("./router/citation.routes");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

connectDB();

// router

app.use(authorRouter);
app.use(bookRouter);
app.use(AuthRouter);
app.use(CitationRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Ishladi: " + PORT);
});
