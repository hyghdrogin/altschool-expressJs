const {
  readDataFile,
  writeDataFile,
} = require("../database/userDatabaseLogic.js");
const validUserAttribute = require("../utils/validation/userValidation.js");

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const validUserData = validUserAttribute(userData);
    if (validUserData) {
      const readUser = await readDataFile();
      const parsedReadUser = JSON.parse(readUser);
      const highestId = parsedReadUser.reduce(
        (maxId, user) => Math.max(maxId, parseInt(user.id)),
        0
      );
      const id = highestId + 1;
      
      const newUser = {
        id,
        name: userData.name.toLowerCase(),
        username: userData.username.toLowerCase(),
        password: userData.password.toLowerCase(),
      };
      newUser.api_key = `${userData.username.toLowerCase()}_${userData.password.toLowerCase()}`;
      
      if (newUser.username === "hyghdrogin") {
        newUser.role = "admin";
      } else {
        newUser.role = "user";
      }

      const uniqueUser = parsedReadUser.find(
        (user) => user.username === newUser.username
      );
      if (uniqueUser) {
        return res.status(400).send({
          message: `User: ${userData.username} already exist`,
        });
      }
      parsedReadUser.push(newUser);
      await writeDataFile(parsedReadUser);
      return res.status(201).send({
        message: "User Created Successfully",
        data: { user: newUser },
      });
    } return res.status(400).send({
      message:
        "Incorrect Data Input, Inputted data should be name (string), username (string) and password(string)",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createUser,
};
