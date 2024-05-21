import { Schema, model, Model, HydratedDocument } from "mongoose";
import { inspect } from "util";
import { validate } from "email-validator";
import { Transform } from "stream";
import bcrypt from "bcrypt";
import { IUser } from "types";

interface IUserModel extends Model<IUser> {
  comparePassword(
    email: string,
    password: string,
  ): Promise<HydratedDocument<IUser>>;
}

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
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  const hashed = await bcrypt.hash(this.password, 10);
  this.password = hashed;
  next();
});

UserSchema.statics.comparePassword = async function (email, password) {
  try {
    const user = await this.findOne({ email: email });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const UserModel = model<IUser, IUserModel>("User", UserSchema);

export default UserModel;
