import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const MAX_TAKE = 50;

export async function GET(req: Request){

	const { searchParams } = new URL(req.url);

	const search = searchParams.get("query")?.trim() ?? '';

	const sortParamId = searchParams.get("sort") ?? '';

	const categoryId = Number(searchParams.get("categoryId")) || null;

	const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

	// Один и тот же размер страницы и для skip, и для take — иначе пагинация ломается
	const take = Math.min(MAX_TAKE, Number(searchParams.get("take")) || (search ? 5 : 6));

	// Преобразуем параметр sortParam в поле Prisma
	const orderBy: Prisma.ProductOrderByWithRelationInput = (() => {
		switch (sortParamId) {
			case "по цене":
				return { price: 'asc' };
			case "по алфавиту":
				return { name: 'asc' };
			case "популярное":
				return { id: 'desc' };
			default:
				return { id: 'asc' };
		}
	})();

	const where: Prisma.ProductWhereInput = {
		...(categoryId ? { categoryId } : {}),
		...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
	};

	try {
		// Promise.all вместо $transaction: для чтения транзакция не нужна,
		// а её старт (BEGIN) — лишний round-trip и источник ошибки P2028
		const [products, total] = await Promise.all([
			prisma.product.findMany({
				where,
				select: {
					id: true,
					name: true,
					price: true,
					imageUrl: true,
					description: true,
					ingredients: true,
					category: { select: { name: true, id: true } },
				},
				orderBy,
				skip: (currentPage - 1) * take,
				take,
			}),
			prisma.product.count({ where }),
		]);
		return NextResponse.json({products, total});
	} catch (error) {
		console.error("[GET /api/products]", error);
		return NextResponse.json({ message: "Не удалось загрузить товары" }, { status: 500 });
	}
}
