const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../../src/data", "items.json");

const readDataFile = async () => {
  let rawData = "";
  rawData = await fs.promises.readFile(dataFilePath, "utf-8");
  if (!rawData) {
    rawData = "[]";
  }
  return rawData;
};

const writeDataFile = async (data) => {
  await fs.promises.writeFile(
    dataFilePath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
};

module.exports = {
  readDataFile,
  writeDataFile,
};
