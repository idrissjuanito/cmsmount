import axios from "axios";
import { response } from "express";

const axioS = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

describe("Accessing protected routes without credentials", () => {
  const endpoints = ["users", "/content/posts", "/content/projects", "/apps"];
  endpoints.forEach(async (route) => {
    it("Bad request " + route + " fail with unauthorized error", async () => {
      try {
        const res = await axioS.get(route);
      } catch (error: any) {
        expect(error.response.data.error).toBe("Access unauthorized");
      }
    });
  });

  it("bad request to /login unprotected but requires logins", async () => {
    try {
      const res = await axioS.get("/login");
    } catch (error: any) {
      expect(error.response.data.error).toBe(
        "Bad request: Missing credentials",
      );
    }
  });
});
