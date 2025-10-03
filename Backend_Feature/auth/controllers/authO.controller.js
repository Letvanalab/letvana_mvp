const AuthOService = require("../services/authOService");

const GetProfileController = async (req, res) => {
  try {
    if (!req.oidc.isAuthenticated()) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }
    const authOUser = req.oidc.user;
    const profile = await AuthOService.getProfile(authOUser);

    if (profile.success) {
      return res.status(401).json({
        success: false,
        error: result.error,
      });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error in GetProfile:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = {
  GetProfileController,
};
