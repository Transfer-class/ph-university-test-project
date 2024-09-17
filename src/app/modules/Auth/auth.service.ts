import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configuration } from "../../config";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "this user not found");
  }

  // checking if the user is Deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "this user is Deleted ");
  }

  // check if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "this user is blocked ");
  }

  // checking if the password is correct
  if (!User.isPasswordMatched)
    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(httpStatus.FORBIDDEN, "wrong password");
    }

  // create token and sent to the client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    configuration.jwt_access_secret as string,
    configuration.jwt_access_expiresIn as string
  );
  const refreshToken = jwt.sign(
    jwtPayload,
    configuration.jwt_refresh_secret as string,
    { expiresIn: configuration.jwt_refresh_expiresIn }
  );

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "this user not found");
  }

  // checking if the user is Deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "this user is Deleted ");
  }

  // check if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "this user is blocked ");
  }

  // checking if the password is correct
  if (!User.isPasswordMatched)
    if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
      throw new AppError(httpStatus.FORBIDDEN, "wrong password");
    }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(configuration.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
  return null;
};

const refreshToken = async (token: string) => {
  // checking if the token is missing

  const decoded = jwt.verify(
    token,
    configuration.jwt_refresh_secret as string
  ) as JwtPayload;

  const { role, id, iat } = decoded.role;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "this user not found");
  }

  // checking if the user is Deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "this user is Deleted ");
  }

  // check if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "this user is blocked ");
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    configuration.jwt_access_secret as string,
    configuration.jwt_access_expiresIn as string
  );

  return accessToken;
};

const forgetPassword = async (userId: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "this user not found");
  }

  // checking if the user is Deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "this user is Deleted ");
  }

  // check if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "this user is blocked ");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const resetToken = createToken(
    jwtPayload,
    configuration.jwt_access_secret as string,
    "10m"
  );

  const resetUiLINK = `${configuration.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUiLINK);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "this user not found");
  }

  // checking if the user is Deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "this user is Deleted ");
  }

  // check if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "this user is blocked ");
  }

  const decoded = verifyToken(
    token,
    configuration.jwt_refresh_secret as string
  );

  if (decoded.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, "you are forbidden");
  }

  // new hashed password

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(configuration.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
};
export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
