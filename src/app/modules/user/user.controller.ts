import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

const createStudentIntoDB: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.file, "file");
  // console.log(JSON.parse(req.body.data));
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student has created successfully",
    data: result,
  });
});
const createAdminIntoDB = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin has created successfully",
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;
  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, "Token not found");
  // }

  const { userId, role } = req.user;

  const result = await UserServices.getMe(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user is retrieved successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user status has been changed successfully",
    data: result,
  });
});

export const UserController = {
  createStudentIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
