import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";

const router = express.Router();

router.get("/:id", StudentControllers.getSingleStudent);

router.delete("/:id", StudentControllers.deleteStudent);
router.patch(
  "/:id",
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudentIntoDB
);

router.get("/", StudentControllers.getAllStudents);

export const StudentRoutes = router;
