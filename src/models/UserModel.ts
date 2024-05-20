import { Schema, model } from "mongoose";
import { inspect } from "util";
import { validate } from "email-validator";
import { Transform } from "stream";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: validate,
        message: (props) => {
          return "Invalid email address";
        },
      },
    },
    password: {
      type: String,
      required: true,
      transform: async (value: string) => {
        const hashed = await bcrypt.hash(value, 10);
        return hashed;
      },
    },
  },
  { timestamps: true },
);

const UserModel = model("User", UserSchema);

export default UserModel;
