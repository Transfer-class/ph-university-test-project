import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";

import { configuration } from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized ");
    }

    const decoded = jwt.verify(
      token,
      configuration.jwt_access_secret as string
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
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
