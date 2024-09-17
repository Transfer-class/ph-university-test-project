import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterServices } from "./academicSemester.service";

const CreateAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.CreateAcademicSemesterIntoDB(
    req.body
  );
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester has created successfully ",
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterServices.getAllAcademicSemester();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Academic semester has retrieved successfully ",
      data: result,
    });
  }
);

const getAAcademicSemester = async (req: Request, res: Response) => {
  const semester_id = req.params._id;
  const result = await academicSemesterServices.getAAcademicSemester(
    semester_id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester has retrieved successfully",
    data: result,
  });
};

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester has updated successfully",
    data: result,
  });
});

export const AcademicSemesterController = {
  CreateAcademicSemester,
  getAllAcademicSemester,
  getAAcademicSemester,
  updateAcademicSemester,
};
