import express, { Request, Response, NextFunction } from "express";
import { UserController } from "./user.controller";

import { createStudentValidationSchema } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { FacultyControllers } from "../Faculty/faculty.controller";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { AdminControllers } from "../Admin/admin.controller";
import { UserValidation } from "./user.validator";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  // validateRequest(createStudentValidationSchema),
  UserController.createStudentIntoDB
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  FacultyControllers.createFaculty
);
router.post(
  "/me",
  auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  FacultyControllers.createFaculty
);
router.post(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus
);

// router.post("/create-admin",auth(USER_ROLE.admin),validateRequest(createAdminValidationSchema),AdminControllers.createAdmin)

export const UserRoutes = router;
