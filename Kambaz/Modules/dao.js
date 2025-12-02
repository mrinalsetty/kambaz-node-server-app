// Kambaz/Modules/dao.js
import { v4 as uuidv4 } from "uuid";
import courseModel from "../Courses/model.js";

export default function ModulesDao(db) {
  let { modules } = db; // still used nowhere except legacy; fine to keep

  const findModulesForCourse = async (courseId) => {
    const course = await courseModel.findById(courseId);
    return course?.modules || [];
  };

  const createModule = async (courseId, module) => {
    const newModule = { ...module, _id: uuidv4() };

    await courseModel.updateOne(
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

  const updateModule = async (courseId, moduleId, moduleUpdates) => {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return null;
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      return null;
    }

    Object.assign(module, moduleUpdates);

    await course.save();
    return module;
  };

  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
