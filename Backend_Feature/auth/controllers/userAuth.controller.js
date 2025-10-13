const userService = require("../services/userAuthService");

const CreateUserController = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      user_type,
      profile_picture_url,
    } = req.body;
    
    const newUser = await userService.createUser({
      first_name,
      last_name,
      email,
      password,
      phone_number,
      user_type,
      profile_picture_url,
    });

    if (!newUser.success) {
      return res.status(newUser.status).json(newUser);
    }
    return res.status(newUser.status).json(newUser);
  } catch (error) {
    console.error("Error in userAuth cont", error);
    return res
      .status(500)
      .json({ status: 500, success: false, message: "internal server error" });
  }
};

const LoginUserController = async (req, res) => {
  try {
    const existingUser = await userService.loginUser(req.body);

    if (!existingUser) {
      return res.status(existingUser.status).json(existingUser);
    }
    return res.status(existingUser.status).json(existingUser);
  } catch (error) {
    console.error("Error in loginUser controller", error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

module.exports = {
  CreateUserController,
  LoginUserController,
};
