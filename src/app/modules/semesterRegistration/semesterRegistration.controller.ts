import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { semesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Registration has been successfully created",
      data: result,
    });
  }
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.getAllSemesterRegistrationsIntoDB(
        req.query
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All registrations have been retrieved successfully",
      data: result,
    });
  }
);
const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationService.getSingleSemesterRegistrationIntoDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "single registration retrieved successfully",
      data: result,
    });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "semester registration has updated successfully",
      data: result,
    });
  }
);

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  updateSemesterRegistration,
  getSingleSemesterRegistration,
};
