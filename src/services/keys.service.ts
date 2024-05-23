import jwt from "jsonwebtoken";
import config from "../config";

export const generateApiKey = async (appId: string) => {
  const token = await jwt.sign({ appId }, config.secret, {
    expiresIn: 60 * 60 * 24 * 6,
  });
  const apiKey = Buffer.from(token, "utf8")
    .toString("base64")
    .replace("==", "");
  return apiKey;
};

export const isValidApiKey = async (key: string, appId: string) => {
  const token = Buffer.from(key, "base64").toString("utf8");
  const tokenPayload = (await jwt.verify(token, config.secret)) as {
    appId: string;
  };
  if (appId !== tokenPayload.appId) return false;
  return true;
};
