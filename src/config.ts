import "dotenv/config";
import { createLogger, format, transports } from "winston";

type TEnv = "development" | "production" | "test";
const env: TEnv = process.env.NODE_ENV as TEnv;
const pass: string = process.env.DB_PASS || "";
const user: string = process.env.DB_USER || "";
const secret: string = process.env.T_SECRET || "";

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
  level: "debug",
  format: format.combine(format.timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

const config = {
  development: {
    mongoUrl: "mongodb://127.0.0.1:27017/dev_cmsmount",
    secret,
  },
  production: {
    mongoUrl: `mongodb+srv://${user}:${pass}@cmsmountdb.s7c7cii.mongodb.net/?retryWrites=true&w=majority&appName=cmsmountdb`,
    secret,
  },
  test: {
    mongoUrl: "mongodb://localhost:27017/test_cmsmount",
    secret,
  },
};

export default config[env];
