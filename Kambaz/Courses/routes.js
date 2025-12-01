import CoursesDao from "./dao.js";
export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const findAllCourses = (req, res) => res.json(dao.findAllCourses());
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    res.json(dao.findCoursesForEnrolledUser(userId));
  };
  const createCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "STUDENT") {
      res.sendStatus(403);
      return;
    }
    const newCourse = dao.createCourse(req.body, currentUser._id);
    res.json(newCourse);
  };
  const deleteCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "STUDENT") {
      res.sendStatus(403);
      return;
    }
    dao.deleteCourse(req.params.courseId);
    res.sendStatus(200);
  };
  const updateCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (currentUser.role === "STUDENT") {
      res.sendStatus(403);
      return;
    }
    const updated = dao.updateCourse(req.params.courseId, req.body);
    res.json(updated);
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}
