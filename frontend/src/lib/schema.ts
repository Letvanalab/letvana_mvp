import z from "zod";

export const userTypeSchema = z.enum(['tenant', 'landlord']);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  userType: userTypeSchema || null,
  rememberMe: z.boolean().optional().default(false),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;