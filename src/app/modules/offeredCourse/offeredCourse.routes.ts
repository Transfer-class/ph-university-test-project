import express from "express";
import { offeredCoursesController } from "./offeredCourse.controller";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";

const router = express.Router();

router.get("/", offeredCoursesController.getAllOfferedCourses);
// router.get("/:id", offeredCoursesController.getsingleOfferedCourse);
router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCoursesController.createOfferedCourse
);

router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  offeredCoursesController.updateOfferedCourse
);

export const offeredCoursesRoute = router;
