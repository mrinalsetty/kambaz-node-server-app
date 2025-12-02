import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import db from "../Database/index.js";

const findAllCourses = () => {
  return model.find();
};

const findCoursesForEnrolledUser = async (userId) => {
  const { enrollments } = db;
  const courses = await model.find();

  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );

  return enrolledCourses;
};

const createCourse = async (course) => {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
};

const deleteCourse = async (courseId) => {
  db.enrollments = db.enrollments.filter((e) => e.course !== courseId);
  return model.deleteOne({ _id: courseId });
};

const updateCourse = async (courseId, updates) => {
  return model.updateOne({ _id: courseId }, { $set: updates });
};

export default {
  findAllCourses,
  findCoursesForEnrolledUser,
  createCourse,
  deleteCourse,
  updateCourse,
};
