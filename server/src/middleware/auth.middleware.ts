import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import "dotenv/config";


// ==============================
// User type
// ==============================

interface AuthUser extends JwtPayload {
  id: number;
  email: string;
  role: "user" | "admin";
}


// ==============================
// Extend Express Request
// ==============================

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}


// ==============================
// JWT Secret
// ==============================

export const secretKey = process.env.JWT_SECRET;


// ==============================
// Authentication Middleware
// ==============================

export const userAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  // Authorization header check
  if (!authHeader) {
    return res.status(401).json({
      message: "User authentication failed",
    });
  }

  // Get token from "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  // JWT secret check
  if (!secretKey) {
    return res.status(500).json({
      message: "JWT_SECRET is not configured",
    });
  }

  // Verify token
  jwt.verify(token, secretKey, (error, decoded) => {

    if (error) {
      return res.status(403).json({
        message: "Invalid or expired token",
      });
    }

    req.user = decoded as AuthUser;

    next();
  });
};