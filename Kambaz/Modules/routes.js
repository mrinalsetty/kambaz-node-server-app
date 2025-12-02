import ModulesDao from "./dao.js";

export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModuleForCourse = async (req, res) => {
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
    const module = { ...req.body };
    const newModule = await dao.createModule(courseId, module);

    res.json(newModule);
  };

  const deleteModule = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }
    dao.deleteModule(req.params.moduleId);
    res.sendStatus(200);
  };

  const updateModule = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }
    const updated = dao.updateModule(req.params.moduleId, req.body);
    res.json(updated);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}
