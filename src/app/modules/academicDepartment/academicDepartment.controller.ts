import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academicDepartment.service";

const CreateAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.CreateAcademicDepartmentIntoDB(req.body);
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department has created successfully ",
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.getAllAcademicDepartmentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Academic Faculties have retrieved successfully ",
      data: result,
    });
  }
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const departmentId = req.params.id;
    const result = await academicDepartmentServices.getSingleAcademicDepartment(
      departmentId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department has retrieved successfully",
      data: result,
    });
  }
);

const updateAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department has updated successfully",
    data: result,
  });
});

export const AcademicDepartmentController = {
  CreateAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartmentIntoDB,
};
