import app from "./app.js";
import connectToDatabase from "./db/connect.js";

app.listen(process.env.PORT, () => {
  console.log(`server in running on PORT : ${process.env.PORT}`);
  connectToDatabase();
});
