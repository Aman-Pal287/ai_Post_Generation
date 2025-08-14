require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/db/db");


connectToDb();

app.listen(process.env.PORT, () => {
  console.log(`server is runnig on port ${process.env.PORT}`);
});
