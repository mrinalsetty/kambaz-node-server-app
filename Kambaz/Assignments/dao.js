import { v4 as uuidv4 } from "uuid";
export default function AssignmentsDao(db) {
  let { assignments } = db;
  const findAssignmentsForCourse = (courseId) =>
    assignments.filter((a) => a.course === courseId);
  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    assignments = [...assignments, newAssignment];
    return newAssignment;
  };
  const deleteAssignment = (id) => {
    assignments = assignments.filter((a) => a._id !== id);
  };
  const updateAssignment = (id, updates) => {
    assignments = assignments.map((a) =>
      a._id === id ? { ...a, ...updates } : a
    );
    return assignments.find((a) => a._id === id);
  };
  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
