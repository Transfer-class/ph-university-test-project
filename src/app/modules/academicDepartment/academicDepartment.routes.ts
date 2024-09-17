import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-academic-department",
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  // ),
  AcademicDepartmentController.CreateAcademicDepartment
);

router.get("/", AcademicDepartmentController.getAllAcademicDepartment);
router.get("/:id", AcademicDepartmentController.getSingleAcademicDepartment);
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.updateAcademicDepartmentIntoDB
);

export const AcademicDepartmentRoutes = router;
