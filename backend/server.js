require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/db/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

connectToDb();

app.listen(process.env.PORT, () => {
  console.log(`server is runnig on port ${process.env.PORT}`);
});
