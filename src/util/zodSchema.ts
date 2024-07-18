import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({
    message: "Enter valid email address",
  }),
  password: z.string().min(3),
});

const signUpSchema = z.object({
  name: z.string().min(2).max(15),
  email: z.string().email({
    message: "Enter valid email address",
  }),
  password: z.string().min(3),
});

const projectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  assignee: z.string(),
  status: z.string(),
});

export { loginSchema, signUpSchema, projectSchema, taskSchema };
