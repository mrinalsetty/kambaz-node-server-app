import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignmentForCourse = async (req, res) => {
    const currentUser = req.session.currentUser || req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }

    const { courseId } = req.params;
    const newAssignment = await dao.createAssignment({
      ...req.body,
      course: courseId,
    });
    res.json(newAssignment);
  };

  const deleteAssignment = async (req, res) => {
    const currentUser = req.session.currentUser || req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }

    const { assignmentId } = req.params;
    await dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  };

  const updateAssignment = async (req, res) => {
    const currentUser = req.session.currentUser || req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }

    const { assignmentId } = req.params;
    const updated = await dao.updateAssignment(assignmentId, req.body);
    res.json(updated);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
}
