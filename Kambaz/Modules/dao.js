import { v4 as uuidv4 } from "uuid";
export default function ModulesDao(db) {
  let { modules } = db;
  const findModulesForCourse = (courseId) =>
    modules.filter((m) => m.course === courseId);
  const createModule = (module) => {
    const newModule = { ...module, _id: uuidv4() };
    modules = [...modules, newModule];
    return newModule;
  };
  const deleteModule = (moduleId) => {
    modules = modules.filter((m) => m._id !== moduleId);
  };
  const updateModule = (moduleId, updates) => {
    modules = modules.map((m) =>
      m._id === moduleId ? { ...m, ...updates } : m
    );
    return modules.find((m) => m._id === moduleId);
  };
  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
