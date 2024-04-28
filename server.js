import connectToDatabase from "./db/connect.js";
import { server } from "./sockets/socketConfig.js";

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase();
});
