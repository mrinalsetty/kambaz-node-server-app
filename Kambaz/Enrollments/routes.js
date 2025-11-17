import EnrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const findAllEnrollments = (req, res) => res.json(dao.findAllEnrollments());
  const findEnrollmentsForUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    res.json(dao.findEnrollmentsForUser(userId));
  };
  const enrollCurrentUserInCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };
  const unenrollCurrentUserFromCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/courses/:courseId/enroll", enrollCurrentUserInCourse);
  app.delete("/api/courses/:courseId/enroll", unenrollCurrentUserFromCourse);
}
