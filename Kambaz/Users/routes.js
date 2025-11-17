import UsersDao from "./dao.js";
export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  const signup = (req, res) => {
    const { username } = req.body;
    const existing = dao.findUserByUsername(username);
    if (existing) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const user = dao.createUser(req.body);
    req.session.currentUser = user;
    res.json(user);
  };
  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    req.session.currentUser = user;
    res.json(user);
  };
  const signout = (req, res) => {
    req.session.destroy(() => res.sendStatus(200));
  };
  const profile = (req, res) => {
    const user = req.session.currentUser;
    if (!user) {
      res.sendStatus(401);
      return;
    }
    res.json(user);
  };
  const updateUser = (req, res) => {
    const { userId } = req.params;
    const updated = dao.updateUser(userId, req.body);
    req.session.currentUser = updated;
    res.json(updated);
  };
  const findAllUsers = (req, res) => {
    res.json(dao.findAllUsers());
  };
  const findUserById = (req, res) => {
    const user = dao.findUserById(req.params.userId);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json(user);
  };
  const deleteUser = (req, res) => {
    dao.deleteUser(req.params.userId);
    res.sendStatus(200);
  };

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
}
