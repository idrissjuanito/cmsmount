import { createClient, RedisClientType } from "redis";

class RedisConnection {
  redisClient: null | RedisClientType = null;

  constructor() {
    this.redisClient = createClient();
  }

  async connect() {
    await this.redisClient
      ?.on("error", (error) => console.log("redis connection failed: ", error))
      .connect();
  }
}

const redis = new RedisConnection();
redis.connect();
export default redis.redisClient;
