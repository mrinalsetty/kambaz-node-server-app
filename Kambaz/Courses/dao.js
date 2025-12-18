import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

const findAllCourses = () => {
  return model.find({}, { name: 1, description: 1 });
};

const createCourse = async (course) => {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
};

const deleteCourse = async (courseId) => {
  return model.deleteOne({ _id: courseId });
};

const updateCourse = async (courseId, updates) => {
  await model.updateOne({ _id: courseId }, { $set: updates });
  const updatedCourse = await model.findById(courseId);
  return updatedCourse;
};

export default {
  findAllCourses,
  createCourse,
  deleteCourse,
  updateCourse,
};
