import express from "express";
import type { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { coursesTable } from "../db/schema.ts";
import { db } from "../db/index.ts";
import { userAuthenticate } from "../middleware/auth-middleware.ts";

const router = express.Router();


// ==============================
// GET ALL COURSES
// ==============================

router.get("/", async (req: Request, res: Response) => {
    try {
        const courses = await db
            .select()
            .from(coursesTable);

        return res.json({
            courses,
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
// GET SINGLE COURSE
// ==============================

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const courseId = Number(req.params.id);

        if (Number.isNaN(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID",
            });
        }

        const course = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.id, courseId));

        if (course.length === 0) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        return res.json({
            course: course[0],
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
// CREATE COURSE
// ==============================

router.post(
    "/",
    userAuthenticate,
    async (req: Request, res: Response) => {
        try {
            const {
                title,
                description,
                image,
                price,
                originalPrice,
                status,
            } = req.body;

            if (
                !title ||
                !description ||
                !image ||
                price === undefined ||
                originalPrice === undefined
            ) {
                return res.status(400).json({
                    message: "All course fields are required",
                });
            }

            const course = await db
                .insert(coursesTable)
                .values({
                    title,
                    description,
                    image,
                    price,
                    originalPrice,
                    status: status || "live",
                })
                .returning();

            return res.status(201).json({
                message: "Course created successfully",
                course: course[0],
            });

        } catch (error: unknown) {
            return res.status(500).json({
                error: error instanceof Error
                    ? error.message
                    : "Something went wrong",
            });
        }
    }
);


// ==============================
// UPDATE COURSE
// ==============================

router.put(
    "/:id",
    userAuthenticate,
    async (req: Request, res: Response) => {
        try {
            const courseId = Number(req.params.id);

            if (Number.isNaN(courseId)) {
                return res.status(400).json({
                    message: "Invalid course ID",
                });
            }

            const {
                title,
                description,
                image,
                price,
                originalPrice,
                status,
            } = req.body;

            const updatedCourse = await db
                .update(coursesTable)
                .set({
                    title,
                    description,
                    image,
                    price,
                    originalPrice,
                    status,
                })
                .where(eq(coursesTable.id, courseId))
                .returning();

            if (updatedCourse.length === 0) {
                return res.status(404).json({
                    message: "Course not found",
                });
            }

            return res.json({
                message: "Course updated successfully",
                course: updatedCourse[0],
            });

        } catch (error: unknown) {
            return res.status(500).json({
                error: error instanceof Error
                    ? error.message
                    : "Something went wrong",
            });
        }
    }
);


// ==============================
// DELETE COURSE
// ==============================

router.delete(
    "/:id",
    userAuthenticate,
    async (req: Request, res: Response) => {
        try {
            const courseId = Number(req.params.id);

            if (Number.isNaN(courseId)) {
                return res.status(400).json({
                    message: "Invalid course ID",
                });
            }

            const deletedCourse = await db
                .delete(coursesTable)
                .where(eq(coursesTable.id, courseId))
                .returning();

            if (deletedCourse.length === 0) {
                return res.status(404).json({
                    message: "Course not found",
                });
            }

            return res.json({
                message: "Course deleted successfully",
            });

        } catch (error: unknown) {
            return res.status(500).json({
                error: error instanceof Error
                    ? error.message
                    : "Something went wrong",
            });
        }
    }
);


export default router;