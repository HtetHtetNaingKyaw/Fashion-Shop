import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .regex(
        /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        "Use English letters only, with single spaces between names.",
      ),

    email: z.email("Please enter a valid email address!"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(8, "Password must be at most 8 characters.")
      .regex(/[a-z]/, "Password must contain a lowercase letter.")
      .regex(/[A-Z]/, "Password must contain an uppercase letter.")
      .regex(/[0-9]/, "Password must contain a number."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormInput = z.infer<typeof registerSchema>;
// export type RegisterFormData = z.output<typeof registerSchema>;
