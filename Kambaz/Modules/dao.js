import { v4 as uuidv4 } from "uuid";
import courseModel from "../Courses/model.js";
import modulesModel from "./model.js";

export default function ModulesDao(db) {
  let { modules } = db;

  const findModulesForCourse = async (courseId) => {
    const course = await courseModel.findById(courseId);
    if (course && Array.isArray(course.modules) && course.modules.length > 0) {
      return course.modules;
    }
    const mods = await modulesModel.find({ course: courseId });
    return mods || [];
  };

  const createModule = async (courseId, module) => {
    const newModule = { ...module, _id: uuidv4(), course: courseId };

    await courseModel.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );

    await modulesModel.create(newModule);

    return newModule;
  };

  const deleteModule = async (courseId, moduleId) => {
    const status = await courseModel.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
    await modulesModel.deleteOne({ _id: moduleId });
    return status;
  };

  const updateModule = async (courseId, moduleId, moduleUpdates) => {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return null;
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      await modulesModel.updateOne({ _id: moduleId }, { $set: moduleUpdates });
      return await modulesModel.findById(moduleId);
    }

    Object.assign(module, moduleUpdates);

    await course.save();
    await modulesModel.updateOne({ _id: moduleId }, { $set: moduleUpdates });
    return module;
  };

  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
