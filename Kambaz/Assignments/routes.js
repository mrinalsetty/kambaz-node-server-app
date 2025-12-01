import AssignmentsDao from "./dao.js";
export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);
  const findAssignmentsForCourse = (req, res) => {
    res.json(dao.findAssignmentsForCourse(req.params.courseId));
  };
  const createAssignmentForCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }
    const { courseId } = req.params;
    const newAssignment = dao.createAssignment({
      ...req.body,
      course: courseId,
    });
    res.json(newAssignment);
  };
  const deleteAssignment = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }
    dao.deleteAssignment(req.params.assignmentId);
    res.sendStatus(200);
  };
  const updateAssignment = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }
    const updated = dao.updateAssignment(req.params.assignmentId, req.body);
    res.json(updated);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
}
