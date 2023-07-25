const express = require("express");
const connectDB = require("./db/conn");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
//const port = process.env.port || 5000
port = 8000;

require("dotenv").config();

//connect to database
connectDB();

const app = express();
//using middleware
app.use(express.json());
app.use(cors());

//router
app.use("/auth", require("./routes/authRouter"));
app.use("/post", require("./routes/createPost"));
app.use("/user", require("./routes/userRouter"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app start listnening on port ${port}`);
});
