import axios from "axios";
const axioS = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

describe("User controller endopoints and methods", () => {
  describe("User registration", () => {
    const userData = {
      firstName: "idriss",
      lastName: "juanito",
      email: "idrissjuanito@yopmail.com",
      password: "testpass299",
    };

    it("should fail when required fileds not sent", async () => {
      try {
        const res = await axioS.post("/registration", {});
      } catch (error: any) {
        expect(error.response.data.error).toBe(
          "Bad request: Invalid request data",
        );
      }
    });

    it("should fail when email is invalid", async () => {
      try {
        const res = await axioS.post("/registration", {
          ...userData,
          email: "isrijuanijti",
        });
      } catch (error: any) {
        expect(error.response.data.error).toBe(
          "Bad request: Invalid request data",
        );
      }
    });

    it("Request should succeed with all required fields sent", async () => {
      try {
        const res = await axioS.post("/registration", userData);
        expect(res.data).toHaveProperty("userId");
        expect(res.data.email).toBe(userData.email);
      } catch (e: any) {
        fail("registration should succeed");
      }
    });

    it("Should fail trying to register with email that exist on system", async () => {
      try {
        const res = await axioS.post("/registration", userData);
      } catch (error: any) {
        expect(error.response.data.error).toBe(
          "Bad request: Account already exists with email",
        );
      }
    });

    describe("Logins", () => {
      it("Should be able to login with userData info", async () => {
        try {
          const logins = `${userData.email}:${userData.password}`;
          const credentials = Buffer.from(logins, "utf8").toString("base64");
          const res = await axioS.get("/login", {
            headers: {
              Authorization: "Basic " + credentials,
            },
          });
          expect(res.status).toBe(200);
          expect(res.data).toHaveProperty("email");
          expect(res.data).toHaveProperty("token");
        } catch (e) {
          fail;
        }
      });

      it("Login should fail with wrong credentials", async () => {
        try {
          const logins = `wronngemil@yopmail.com:${userData.password}`;
          const credentials = Buffer.from(logins, "utf8").toString("base64");
          const res = await axioS.get("/login", {
            headers: {
              Authorization: "Basic " + credentials,
            },
          });
        } catch (e: any) {
          expect(e.response.status).toBe(404);
        }
      });

      it("Login should fail with bad request when no credentials sent", async () => {
        try {
          const res = await axioS.get("/login");
        } catch (e: any) {
          expect(e.response.status).toBe(400);
          expect(e.response.data.error).toBe(
            "Bad request: Missing credentials",
          );
        }
      });

      it("should be mocked", () => {
        const mockedModelSave = jest.fn(() => ({
          email: "email",
          _id: "nn90j09jd90w9009242222228hfwjeerf",
        }));

        jest.mock("./src/models/UserModel", () => () => ({
          save: mockedModelSave,
        }));
      });
    });
  });
});
