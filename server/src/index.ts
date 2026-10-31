import express from 'express';
import bcrypt from 'bcrypt';
import { coursesTable, usersTable } from './db/schema.ts';
import { db } from './db/index.ts';
import { eq } from 'drizzle-orm';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Server is running!');
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [newUser] = await db.insert(usersTable).values({ name, email, password: hashedPassword, role }).returning({
        id: usersTable.id,
        email: usersTable.email,
      });
      return res.status(201).json({
        message: 'User created successfully',
        user: newUser,
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    res.status(200).json({
      message: 'Signin successful',
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

app.get('/courses', async (req, res) => {
  try {
    const courses = await db.select().from(coursesTable);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Database fetch error:", error);
    res.status(500).json({ error: "Failed to fetch courses from database" });
  }
});

app.get('/course/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, id)).limit(1);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error("Database fetch error:", error);
    res.status(500).json({ error: "Failed to fetch course from database" });
  }
});

app.post('/add/course', async (req, res) => {
  try {
    const { title, description, image, price, originalPrice } = req.body;
    if (typeof title !== 'string' || !title.trim() || typeof description !== 'string' || !description.trim() || typeof image !== 'string' || !image.trim() || price === null || originalPrice === null) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const [course] = await db.insert(coursesTable).values({ title, description, image, price, originalPrice }).returning();
    res.status(201).json(course);
  } catch (error) {
    console.error('Course creation error:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

app.put('/course/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { description, price } = req.body;
    const [updatedCourse] = await db
      .update(coursesTable)
      .set({ description, price })
      .where(eq(coursesTable.id, id))
      .returning();
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Course update error:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
})

app.delete('/courses/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [deletedCourse] = await db
      .delete(coursesTable)
      .where(eq(coursesTable.id, id))
      .returning();
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    return res.status(200).json({ message: 'Course deleted successfully', courseName: deletedCourse.title });
  } catch (error) {
    console.error('Course deletion error:', error);
    return res.status(500).json({ error: 'Failed to delete course' });
  }
})

app.listen(3000, () => console.log('Server running on port 3000'));