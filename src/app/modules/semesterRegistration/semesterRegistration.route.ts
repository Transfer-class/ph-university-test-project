import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { semesterRegistrationController } from "./semesterRegistration.controller";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.createSemesterRegistration
);

router.get(
  "/:id",
  semesterRegistrationController.getSingleSemesterRegistration
);

router.patch(
  "/:id",
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.updateSemesterRegistration
);
router.get("/", semesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;
