import createServer from "./app";
import connect from "./services/db.service";
import "dotenv/config";

const app = createServer();

connect();
app.listen(3000, () => console.log("Server running on port 3000"));
