import "dotenv/config";

type TEnv = "development" | "production" | "test";
const env: TEnv = process.env.NODE_ENV as TEnv;
const pass: string = process.env.DB_PASS || "";
const user: string = process.env.DB_USER || "";
const config = {
  development: {
    mongoUrl: "mongodb://127.0.0.1:27017/dev_cmsmount",
  },
  production: {
    mongoUrl: `mongodb+srv://${user}:${pass}@cmsmountdb.s7c7cii.mongodb.net/?retryWrites=true&w=majority&appName=cmsmountdb`,
  },
  test: {
    mongoUrl: "mongodb://localhost:27017",
  },
};

export default config[env];
