import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
// import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  res.status(200).json({
    success: true,
    message: "Student has retrieved successfully ",
    data: result,
  });
});

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student has retrieved successfully ",
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);

  res.status(200).json({
    success: true,
    message: "Student has deleted successfully ",
    data: result,
  });
});

const updateStudentIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student has updated successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudentIntoDB,
};
