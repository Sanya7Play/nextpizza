import "dotenv/config";
import {PrismaClient} from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";


const prisma = new PrismaClient({
	adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {

	// 🔐 Хешируем пароль
	const passwordHash = await bcrypt.hash("123456", 10);

	// 👤 Пользователь 1
	await prisma.user.upsert({
		where: { email: "admin@test.com" },
		update: {},
		create: {
			email: "admin@test.com",
			fullName: "Admin User",
			password: passwordHash,
			emailVerified: new Date(),
		},
	});

	// 👤 Пользователь 2
	await prisma.user.upsert({
		where: { email: "user@test.com" },
		update: {},
		create: {
			email: "user@test.com",
			fullName: "Regular User",
			password: passwordHash,
			emailVerified: new Date(),
		},
	});

	console.log("✅ Users created");

	// 3) Привязать ВСЕ существующие добавки ко ВСЕМ пиццам (category "Пицца")
	// Найдём id категории "Пицца"
	const pizzaCategory = await prisma.category.findFirst({
		where: { name: "Пицца" },
		select: { id: true },
	});

	if (!pizzaCategory) {
		throw new Error("Категория 'Пицца' не найдена");
	}

	// Берём все ингредиенты (добавки), которые уже есть в базе
	const ingredientIds = (
		await prisma.ingredient.findMany({ select: { id: true } })
	).map((i) => i.id);

	// Берём все продукты-пиццы
	const pizzas = await prisma.product.findMany({
		where: { categoryId: pizzaCategory.id },
		select: { id: true },
	});

	// Всем пиццам ставим одинаковый набор добавок (можно перезапускать)
	console.log(`Pizzas to update: ${pizzas.length}, ingredients: ${ingredientIds.length}`);

	let done = 0;
	for (const p of pizzas) {
		await prisma.product.update({
			where: { id: p.id },
			data: {
				ingredients: {
					set: ingredientIds.map((id) => ({ id })),
				},
			},
		});

		done++;
		if (done % 10 === 0) {
			console.log(`✅ Updated ${done}/${pizzas.length}`);
		}
	}

}

main()
	.then(async () => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
