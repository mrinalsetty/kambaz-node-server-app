import { v4 as uuidv4 } from "uuid";
export default function CoursesDao(db) {
  let { courses } = db;
  const findAllCourses = () => courses;
  const findCoursesForEnrolledUser = (userId) =>
    courses.filter((c) =>
      db.enrollments.some((e) => e.user === userId && e.course === c._id)
    );
  const createCourse = (course, userId) => {
    const newCourse = { ...course, _id: uuidv4() };
    courses = [...courses, newCourse];
    db.enrollments = [
      ...db.enrollments,
      { _id: uuidv4(), user: userId, course: newCourse._id },
    ];
    return newCourse;
  };
  const deleteCourse = (courseId) => {
    courses = courses.filter((c) => c._id !== courseId);
    db.enrollments = db.enrollments.filter((e) => e.course !== courseId);
  };
  const updateCourse = (courseId, updates) => {
    courses = courses.map((c) =>
      c._id === courseId ? { ...c, ...updates } : c
    );
    return courses.find((c) => c._id === courseId);
  };
  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
