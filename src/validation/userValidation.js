const validUserAttribute = (user) => {
  const validRoles = ["admin", "user"];
  
  if (!user.role || !validRoles.includes(user.role)) {
      user.role = "user";
  }

  return (
      user.name &&
      typeof user.name === "string" &&
      user.password &&
      typeof user.password === "string" &&
      user.username &&
      typeof user.username === "string" &&
      validRoles.includes(user.role)
  );
};

module.exports = validUserAttribute;
