import express from "express";
import { StudentRoutes } from "../modules/student/student.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { FacultyRoutes } from "../modules/Faculty/faculty.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { CourseRoutes } from "../modules/Course/course.routes";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCoursesRoute } from "../modules/offeredCourse/offeredCourse.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";

const router = express.Router();
// router.use("/users", UserRoutes);
// router.use("/students", StudentRoutes);

// refactoring the top two line
const moduleRoutes = [
  { path: "/users", route: UserRoutes },
  { path: "/students", route: StudentRoutes },
  { path: "/faculties", route: FacultyRoutes },
  { path: "/admins", route: AdminRoutes },
  { path: "/academic-semesters", route: AcademicSemesterRoutes },
  { path: "/academic-faculties", route: AcademicFacultyRoutes },
  { path: "/academic-departments", route: AcademicDepartmentRoutes },
  { path: "/courses", route: CourseRoutes },
  { path: "/semester-registrations", route: semesterRegistrationRoutes },
  { path: "/offered-course", route: offeredCoursesRoute },
  { path: "/auth", route: AuthRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
