import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins/email-otp";

import { sendEmail } from "./email";
import prisma from "./prisma";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      prompt: "select_account",
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },

  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,

      async sendVerificationOTP({ email, otp, type }) {
        const subjects: Record<string, string> = {
          "email-verification": "Verify your email address",
          "forget-password": "Reset your password",
          "sign-in": "Your sign-in OTP",
        };

        await sendEmail({
          to: email,
          subject: subjects[type] ?? "Your verification code",
          html: `
            <div>
              <h2>Fashion Shop</h2>
              <p>Your verification code is:</p>
              <h1>${otp}</h1>
              <p>Please use this code to continue.</p>
            </div>
          `,
        });
      },
    }),

    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
