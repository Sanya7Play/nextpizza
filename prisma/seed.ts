import "dotenv/config";
import {PrismaClient} from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const prisma = new PrismaClient({
	adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {

	// 🛒 Создаём тестовую корзину для user@test.com
	const testUser = await prisma.user.findUnique({
		where: { email: "arsikpopov17@gmail.com" },
		select: { userId: true },
	});

	if (!testUser) {
		throw new Error("Test user not found");
	}

// Возьмём любые 2 продукта
	const products = await prisma.product.findMany({
		take: 2,
		select: { id: true, price: true },
	});

	if (products.length < 2) {
		throw new Error("Not enough products to create test cart");
	}

// Удалим старую корзину если есть
	await prisma.cart.deleteMany({
		where: { userId: testUser.userId },
	});

// Создаём новую корзину
	const cart = await prisma.cart.create({
		data: {
			userId: testUser.userId,
			totalAmount: products[0].price + products[1].price,
			items: {
				create: [
					{
						productId: products[0].id,
						quantity: 1,
					},
					{
						productId: products[1].id,
						quantity: 1,
					},
				],
			},
		},
		include: {
			items: true,
		},
	});

	console.log("🛒 Test cart created:", cart.id);

}

main()
	.then(async () => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
