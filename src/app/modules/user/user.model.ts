import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import { configuration } from "../../config";
import bcrypt from "bcrypt";
import { UserStatus } from "./user.constant";

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      select: 0,
    },

    needsPasswordChange: { type: Boolean, default: true },

    passwordChangedAt: {
      type: Date,
    },

    role: { type: String, enum: ["student", "faculty", "admin"] },
    status: {
      type: String,
      enum: UserStatus,
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// pre hook middleware hook : will work on create() save ()

userSchema.pre("save", async function (next) {
  const user = this;
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(configuration.bcrypt_salt_rounds)
  );
  next();
});

// set empty string ( "" ) after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  // console.log(passwordChangedTimestamp, jwtIssuedTimestamp);
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>("User", userSchema);