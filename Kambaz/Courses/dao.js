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

const createCourse = async (course, userId) => {
  const newCourse = { ...course, _id: uuidv4() };
  const createdCourse = await model.create(newCourse);

  db.enrollments = [
    ...db.enrollments,
    { _id: uuidv4(), user: userId, course: newCourse._id },
  ];

  return createdCourse;
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
