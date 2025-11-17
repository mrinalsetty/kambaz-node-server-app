const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

let moduleObj = {
  id: "m1",
  name: "Intro",
  description: "Overview",
  course: "CS5610",
};

export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  const setAssignmentScore = (req, res) => {
    const { score } = req.params;
    assignment.score = parseInt(score);
    res.json(assignment);
  };
  const setAssignmentCompleted = (req, res) => {
    const { completed } = req.params;
    assignment.completed = completed === "true";
    res.json(assignment);
  };

  const getModule = (req, res) => {
    res.json(moduleObj);
  };
  const getModuleName = (req, res) => {
    res.json(moduleObj.name);
  };
  const setModuleName = (req, res) => {
    const { name } = req.params;
    moduleObj.name = name;
    res.json(moduleObj);
  };
  const setModuleDescription = (req, res) => {
    const { description } = req.params;
    moduleObj.description = description;
    res.json(moduleObj);
  };

  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/score/:score", setAssignmentScore);
  app.get("/lab5/assignment/completed/:completed", setAssignmentCompleted);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);

  app.get("/lab5/module/name/:name", setModuleName);
  app.get("/lab5/module/description/:description", setModuleDescription);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module", getModule);
}
