import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
  let { users } = db;
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users = [...users, newUser];
    return newUser;
  };
  const findAllUsers = () => users;
  const findUserById = (id) => users.find((u) => u._id === id);
  const findUserByUsername = (username) =>
    users.find((u) => u.username === username);
  const findUserByCredentials = (username, password) =>
    users.find((u) => u.username === username && u.password === password);
  const updateUser = (id, updates) => {
    users = users.map((u) => (u._id === id ? { ...u, ...updates } : u));
    return findUserById(id);
  };
  const deleteUser = (id) => {
    users = users.filter((u) => u._id !== id);
  };
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
