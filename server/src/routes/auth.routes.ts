import express from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { usersTable } from "../db/schema.ts";
import { db } from "../db/index.ts";
import { secretKey } from "../middleware/auth-middleware.ts";

const router = express.Router();


// ==============================
// Generate JWT
// ==============================

type JwtUser = {
  id: number;
  email: string;
};

const generateJwt = (user: JwtUser): string => {
  if (!secretKey) {
    throw new Error("JWT_SECRET is not configured");
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  return jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
};


// ==============================
// SIGNUP
// ==============================

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check existing user
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    // Generate token
    const token = generateJwt({
      id: user[0].id,
      email: user[0].email,
    });

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      },
    });

  } catch (error: unknown) {
    return res.status(500).json({
      error: error instanceof Error
        ? error.message
        : "Something went wrong",
    });
  }
});


// ==============================
// SIGNIN
// ==============================

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (user.length === 0) {
      return res.status(403).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user[0].password
    );

    if (!passwordMatch) {
      return res.status(403).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = generateJwt({
      id: user[0].id,
      email: user[0].email,
    });

    return res.json({
      message: "Logged in successfully",
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      },
    });

  } catch (error: unknown) {
    return res.status(500).json({
      error: error instanceof Error
        ? error.message
        : "Something went wrong",
    });
  }
});


export default router;