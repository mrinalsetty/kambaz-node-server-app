import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao(db) {
  async function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  async function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
  }

  async function deleteAssignment(id) {
    return model.deleteOne({ _id: id });
  }

  async function updateAssignment(id, updates) {
    await model.updateOne({ _id: id }, { $set: updates });
    return model.findById(id);
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
