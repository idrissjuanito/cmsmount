import "dotenv/config";

type TEnv = "development" | "production" | "test";
const env: TEnv = process.env.NODE_ENV as TEnv;
const pass: string = process.env.DB_PASS || "";
const user: string = process.env.DB_USER || "";
const config = {
  development: {
    mongoUrl: "mongodb://localhost:27017",
    colPrefix: "dev_",
  },
  production: {
    mongoUrl: `mongodb+srv://${user}:${pass}@cmsmountdb.s7c7cii.mongodb.net/?retryWrites=true&w=majority&appName=cmsmountdb`,
    colPrefix: "",
  },
  test: {
    mongoUrl: "mongodb://localhost:27017",
    colPrefix: "test_",
  },
};

export default config[env];
