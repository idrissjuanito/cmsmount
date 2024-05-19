import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Some response and more");
});

app.listen(3000, () => console.log("Server running on port 3000"));
