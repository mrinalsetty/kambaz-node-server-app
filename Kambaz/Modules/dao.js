import { v4 as uuidv4 } from "uuid";
import courseModel from "../Courses/model.js";

export default function ModulesDao(db) {
  let { modules } = db;

  const findModulesForCourse = async (courseId) => {
    const course = await courseModel.findById(courseId);
    return course?.modules || [];
  };

  const createModule = async (courseId, module) => {
    const newModule = { ...module, _id: uuidv4() };

    const status = await courseModel.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );

    return newModule;
  };

  const deleteModule = async (courseId, moduleId) => {
    const status = await courseModel.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
    return status;
  };

  const updateModule = (moduleId, updates) => {
    modules = modules.map((m) =>
      m._id === moduleId ? { ...m, ...updates } : m
    );
    return modules.find((m) => m._id === moduleId);
  };

  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
