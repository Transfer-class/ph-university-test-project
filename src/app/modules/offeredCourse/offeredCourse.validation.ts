import { string, z } from "zod";
import { Days } from "./offeredCourse.constant";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: "Invalid time format. Expected HH:MM (24-hour format)",
  }
);

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicSemester: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),

      // startTime: z.string().refine((time) => console.log(time)), // HH:MM      00-23 : 00-59
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // startTime :   10:30 => 1970-01-01T10:30
        // endTime :   13:30 => 1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      { message: "startTime should be before endTime" }
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string(),
      endTime: z.string(),
    })
    .refine(
      (body) => {
        // startTime :   10:30 => 1970-01-01T10:30
        // endTime :   13:30 => 1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      { message: "startTime should be before endTime" }
    ),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
