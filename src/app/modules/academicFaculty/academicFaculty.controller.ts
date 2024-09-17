import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";

const CreateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.CreateAcademicFacultyIntoDB(
    req.body
  );
  //
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty has created successfully ",
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicFacultyServices.getAllAcademicFacultiesFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Academic Faculties have retrieved successfully ",
      data: result,
    });
  }
);

const getSingleAcademicFaculty = async (req: Request, res: Response) => {
  const faculty_id = req.params._id;
  const result = await academicFacultyServices.getSingleAcademicFaculty(
    faculty_id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty has retrieved successfully",
    data: result,
  });
};

const updateAcademicFacultyIntoDB = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty has updated successfully",
    data: result,
  });
});

export const AcademicFacultyController = {
  CreateAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFacultyIntoDB,
};
