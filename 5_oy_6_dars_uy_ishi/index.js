const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
const errorMiddleware = require("./middleware/error.middleware");
const { AuthRouter } = require("./router/auth.routes");
const { UploadRouter } = require("./router/upload.routes");
const { SuperAdminRouter } = require("./router/superadmin.routes");
const { userRouter } = require("./router/user.routes");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

connectDB();

// upload

app.use("/images", express.static("upload/images"));

// router

app.use(AuthRouter)
app.use(authorRouter);
app.use(bookRouter);
app.use(UploadRouter)
app.use(SuperAdminRouter)
app.use(userRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log("Ishladi: " + PORT);
});
