import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "../src/prisma/contract";
import contractJson from "../src/prisma/contract.json" with { type: "json" };

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const db = postgres<Contract>({ url: connectionString, contractJson });

export default prisma;
