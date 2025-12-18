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

  const deleteModule = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }

    const { courseId, moduleId } = req.params;
    const status = await dao.deleteModule(courseId, moduleId);
    res.send(status);
  };

  // 6.4.2.5 – async update with courseId + moduleId
  const updateModule = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    if (!["FACULTY", "TA", "ADMIN"].includes(currentUser.role)) {
      res.sendStatus(403);
      return;
    }

    const { courseId, moduleId } = req.params;
    const moduleUpdates = req.body;

    const updated = await dao.updateModule(courseId, moduleId, moduleUpdates);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.json(updated);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
}
