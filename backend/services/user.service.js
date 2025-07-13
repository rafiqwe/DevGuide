const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  try {
    if (!firstname || !email || !password) {
      throw new Error("All fields are required");
    }

    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });
    return user;
  } catch (error) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
