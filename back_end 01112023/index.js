const express = require("express");
const connectDB = require("./db/conn");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const port = process.env.port || 8000;
//port = 8000;

require("dotenv").config();

//connect to database
connectDB();

const app = express();
//using middleware
app.use(express.json());
app.use(cors());
//image path link to frentend to backend
app.use("/public", express.static(path.join(__dirname, "public")));

//router
app.use("/auth", require("./routes/authRouter"));
app.use("/post", require("./routes/createPost"));
app.use("/user", require("./routes/userRouter"));

//using error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app start listnening on port ${port}`);
});
