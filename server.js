require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const adminRoute = require("./router/admin-router");
const UserRoute = require("./router/user-router");
const MyQuestions = require("./router/MyQuestions-router");
const port = process.env.PORT || 8000;
const app = express();
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
  origin: "https://assignment-frontend-zeta-cyan.vercel.app/login",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  Credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/User", UserRoute);
app.use("/api/MyQuestions", MyQuestions);

app.use(errorMiddleware);
connectDB().then(() => {
  app.listen(port, (req, res) => {
    console.log(`listning the port number ${port}`);
  });
});
