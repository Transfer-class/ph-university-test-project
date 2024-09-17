import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { offeredOfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredOfferedCourseService.createOfferedCourseIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course Created Successfully",
    data: result,
  });
});
const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = 1;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All offered courses are retrieved successfully",
    data: result,
  });
});
// const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
//   const result = 1;

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "All offered courses are retrieved successfully",
//     data: result,
//   });
// });

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await offeredOfferedCourseService.updateOfferedCourseIntoDB(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course updated successfully",
    data: result,
  });
});

export const offeredCoursesController = {
  createOfferedCourse,
  getAllOfferedCourses,
  updateOfferedCourse,
};
