import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  const findAllEnrollments = () => db.enrollments;
  const findEnrollmentsForUser = (userId) =>
    db.enrollments.filter((e) => e.user === userId);
  const enrollUserInCourse = (userId, courseId) => {
    const existing = db.enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (existing) {
      return existing;
    }
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments = [...db.enrollments, newEnrollment];
    return newEnrollment;
  };
  const unenrollUserFromCourse = (userId, courseId) => {
    db.enrollments = db.enrollments.filter(
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
