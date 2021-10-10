const jsonDAL = require("../Dals/jsonDAL");

const checkUsernameAndPass = async (username, password) => {
  try {
    let resp = await jsonDAL.readJsonFile("Users.json");
    let users = resp.users;
    let user = users.find((user) => user.Username === username);
    if (user && user.Password !== password) {
      return false;
    } else {
      return user;
    }
  } catch (err) {
    return err;
  }
};

const getUsers = async () => {
  let resp = await jsonDAL.readJsonFile("Users.json");
  let users = resp.users;
  return users;
};

const deleteUser = async (id) => {
  try {
    let resp = await jsonDAL.readJsonFile("Users.json");
    let users = resp.users.filter((user) => user.id != id);
    await jsonDAL.writeToJsonFile("Users.json", { users: users });
  } catch (err) {
    console.log(err);
  }
};

const editUser = async (updatedUser) => {
  try {
    let resp = await jsonDAL.readJsonFile("Users.json");
    let users = resp.users.map((user) => {
      if (user.id == updatedUser.id) {
        return { ...updatedUser, CreatedDate: "12/04/21" };
      }
      return user;
    });

    await jsonDAL.writeToJsonFile("Users.json", { users: users });
  } catch (err) {
    console.log(err);
  }
};

const addUser = async (newUser) => {
  let resp = await jsonDAL.readJsonFile("Users.json");
  resp.users.push({
    ...newUser,
    id: resp.users[resp.users.length - 1].id + 1,
  });
  await jsonDAL.writeToJsonFile("Users.json", resp);
};

const getUserById = async (id) => {
  let resp = await jsonDAL.readJsonFile("Users.json");
  let users = resp.users;

  return users.find((user) => user.id == id);
};

module.exports = {
  checkUsernameAndPass,
  getUsers,
  deleteUser,
  editUser,
  getUserById,
  addUser,
};
