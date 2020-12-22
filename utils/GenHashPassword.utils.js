const bcrypt = require("bcryptjs");
const GenUserPassword = async (password) => {
  let salt = await bcrypt.genSalt(10);
  const password2 = await bcrypt.hash(password, salt);
  return password2;
};
module.exports = { GenUserPassword };
