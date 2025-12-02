import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import db from "../Database/index.js";

const findAllCourses = () => {
  return model.find({}, { name: 1, description: 1 });
};

const findCoursesForEnrolledUser = async (userId) => {
  const { enrollments } = db;

  const courses = await model.find({}, { name: 1, description: 1 });

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
  await model.deleteOne({ _id: courseId });
  db.enrollments = db.enrollments.filter((e) => e.course !== courseId);
};

const updateCourse = async (courseId, updates) => {
  await model.updateOne({ _id: courseId }, { $set: updates });
  const updatedCourse = await model.findById(courseId);
  return updatedCourse;
};

export default {
  findAllCourses,
  findCoursesForEnrolledUser,
  createCourse,
  deleteCourse,
  updateCourse,
};
