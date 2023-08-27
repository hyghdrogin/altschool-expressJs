const { readDataFile } = require("../database/userDatabaseLogic.js");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers;

    if (!authHeader.api_key) {
      return res.status(401).send({ message: "You are not authenticated!" });
    }
    const readUser = await readDataFile();
    const parsedReadUser = JSON.parse(readUser);
    const existingUser = parsedReadUser.find(
      (user) => user.api_key === authHeader.api_key
    );
    if (existingUser) {
      req.user = existingUser;
      next();
    } else {
      return res.status(401).send({ message: "You are not authenticated!" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = authMiddleware;
