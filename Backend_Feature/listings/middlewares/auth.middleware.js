const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaClient");
const { errorResponse } = require("../utils/responses");

// Middleware to verify JWT and attach user to req
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, 401, "Authorization header missing or invalid");
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return errorResponse(res, 401, "User not found or unauthorized");
    }

    // Attach user info to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    return errorResponse(res, 401, "Invalid or expired token");
  }
};

// Role-based access control
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 403, "You are not allowed to perform this action");
    }
    next();
  };
};

module.exports = { authenticate, authorize };
