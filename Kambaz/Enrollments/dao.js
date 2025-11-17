import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  let { enrollments } = db;
  const findAllEnrollments = () => enrollments;
  const findEnrollmentsForUser = (userId) =>
    enrollments.filter((e) => e.user === userId);
  const enrollUserInCourse = (userId, courseId) => {
    const existing = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (existing) {
      return existing;
    }
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    enrollments = [...enrollments, newEnrollment];
    return newEnrollment;
  };
  const unenrollUserFromCourse = (userId, courseId) => {
    enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  };
  return {
    findAllEnrollments,
    findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}
