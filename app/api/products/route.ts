import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request){

	const { searchParams } = new URL(req.url);
	const categoryIdParam = searchParams.get("categoryId");

	const sortParam = searchParams.get("sort");

	const query = searchParams.get("query");

	const page = searchParams.get("page");

	const currentPage = page ? Number(page) : 1;

	const search = query ? String(query) : '';

	const sortParamId = sortParam ? String(sortParam) : '';

	const categoryId = categoryIdParam ? Number(categoryIdParam) : null;


	// Преобразуем параметр sortParam в поле Prisma
	const orderBy: object = (() => {
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


	const products = await prisma.product.findMany({
		where: {
			AND: [
				categoryId ? {categoryId} : {},
				search ? {name: {contains: search, mode: 'insensitive'}} : {}
			]
		},
		include: {
			ingredients: true,
			category: { select: { name: true, id: true } },
		},
		orderBy,
		skip: currentPage,
		take: search ? 5 : 6,
	});
	return NextResponse.json(products);
}