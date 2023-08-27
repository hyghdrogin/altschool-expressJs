const validItemAttribute = (item) => {
  return (
    item.name &&
    typeof item.name === "string" &&
    item.price &&
    typeof item.price === "number" &&
    item.size &&
    ["small", "medium", "large"].includes(item.size)
  );
};

module.exports = validItemAttribute
