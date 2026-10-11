import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "@/generated/prisma/client";

// В dev Next.js при hot reload заново выполняет модуль — без кеша в globalThis
// на каждое изменение создаётся новый PrismaClient со своим пулом соединений.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
	// Accelerate ходит по HTTPS (порт 443) — прямое подключение к db.prisma.io:5432
	// из нашей сети зависает, поэтому по умолчанию используем его
	const accelerateUrl = process.env.PRISMA_DATABASE_URL;
	if (accelerateUrl) {
		return new PrismaClient({ accelerateUrl });
	}

	const adapter = new PrismaPg({
		connectionString: `${process.env.DATABASE_URL}`,
		max: 10,
		// Быстро падаем, если БД недоступна, вместо долгого зависания запроса
		connectionTimeoutMillis: 10_000,
		idleTimeoutMillis: 30_000,
	});
	return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma }
