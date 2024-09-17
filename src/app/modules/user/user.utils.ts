// year semesterCode 4digit number
import { ObjectId } from "mongoose";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Student } from "../student/student.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "./user.model";

// i have changed the code to refactor id . if need the tutorial code find the code of module -13

// this is my code

const findLastStudentIdOfTheSemester = async (_id: ObjectId) => {
  const lastStudentOfTheSemester = await Student.findOne(
    {
      admissionSemester: _id,
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean();

  // 203002 0001
  return lastStudentOfTheSemester?.id.substring(6) || undefined;
};

// this is my code
export const generateStudentId = async (payload: TAcademicSemester) => {
  if (!payload._id) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester ID (_id) is required");
  }
  const lastStudentIdOfTheSemester =
    (await findLastStudentIdOfTheSemester(payload._id)) || (0).toString();

  let incrementId = (Number(lastStudentIdOfTheSemester) + 1)
    .toString()
    .padStart(4, "0");
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};
