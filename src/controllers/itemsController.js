const { readDataFile, writeDataFile } = require("../utils/helpers.js");
const validItemAttribute = require("../utils/validation/itemValidation.js");

const createItem = async (req, res) => {
  try {
    const itemData = req.body;
    const validItemData = validItemAttribute(itemData);
    if (validItemData) {
      const itemRead = await readDataFile();
      const parsedReadItem = JSON.parse(itemRead);
      const highestId = parsedReadItem.reduce(
        (maxId, item) => Math.max(maxId, parseInt(item.id)),
        0
      );
      const id = highestId + 1;
      const newItem = {
        id,
        name: itemData.name.toLowerCase(),
        price: itemData.price,
        size: itemData.size,
      };
      parsedReadItem.push(newItem);
      await writeDataFile(parsedReadItem);
      return res.status(201).send({
        message: "Item Created Successfully",
        data: { item: newItem },
      });
    } else {
      return res.status(400).send({
        message:
          "Incorrect Data Input, Inputted data should be name (string), price (number) and size(string with options of small, medium, large)",
      });
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
};

const getItems = async (req, res) => {
  try {
    const { name } = req.query;
    const nameCase = name.toLowerCase();

    const itemRead = await readDataFile();
    let parsedReadItem = JSON.parse(itemRead);

    if (name) {
      parsedReadItem = parsedReadItem.filter((item) => item.name === nameCase);
    }

    return res.status(200).send({
      message: "All Items Fetched Successfully",
      data: { items: parsedReadItem },
    });
  } catch (error) {
    console.log("Error occurred:", error);
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const convertedIdToNumber = Number(id);

    const itemRead = await readDataFile();
    let parsedReadItem = JSON.parse(itemRead);

    const foundItem = parsedReadItem.find(
      (item) => item.id === convertedIdToNumber
    );
    if (foundItem) {
      return res.status(200).send({
        message: "Item Fetched Successfully",
        data: { item: foundItem },
      });
    } else {
      return res.status(404).send({
        message: `Can not find item with id: ${id}`,
      });
    }
  } catch (error) {
    console.log("Error occurred:", error);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const itemData = req.body;
    const validItemData = validItemAttribute(itemData);
    const convertedIdToNumber = Number(id);
    if (validItemData && typeof convertedIdToNumber === "number") {
      const itemRead = await readDataFile();
      let parsedReadItem = JSON.parse(itemRead);

      const itemIndex = parsedReadItem.findIndex(
        (item) => item.id === convertedIdToNumber
      );
      if (itemIndex < 0) {
        return res.status(404).send({
          message: `Id: ${id} not found`,
        });
      }
      parsedReadItem[itemIndex] = {
        id: convertedIdToNumber,
        name: itemData.name.toLowerCase(),
        price: itemData.price,
        size: itemData.size,
      };
      await writeDataFile(parsedReadItem);
      return res.status(200).send({
        message: "Item Updated Successfullly",
        data: {
          item: parsedReadItem[itemIndex],
        },
      });
    } else {
      return res.status(400).send({
        message:
          "Incorrect Data Input, Inputted data should be name (string), price (number) and size(string with options of small, medium, large)",
      });
    }
  } catch (error) {
    console.log("Error occurred:", error);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const convertedIdToNumber = Number(id);

    const itemRead = await readDataFile();
    let parsedReadItem = JSON.parse(itemRead);

    const itemIndex = parsedReadItem.findIndex(
      (item) => item.id === convertedIdToNumber
    );
    if (itemIndex < 0) {
      return res.status(404).send({
        message: `Id: ${id} not found`,
      });
    }
    const deletedItem = parsedReadItem.splice(itemIndex, 1)[0];
    await writeDataFile(parsedReadItem);
    return res.status(200).send({
      message: "Item Deleted Successfully",
      data: { deletedItem },
    });
  } catch (error) {
    console.log("Error occurred:", error);
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
