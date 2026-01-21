import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request){

	const { searchParams } = new URL(req.url);
	const categoryIdParam = searchParams.get("categoryId");

	const categoryId = categoryIdParam ? Number(categoryIdParam) : null;

	const products = await prisma.product.findMany({
		where: categoryId ? {categoryId} : undefined,
		include: {
			ingredients: true,
			category: { select: { name: true, id: true } },
		},
		orderBy: {id: 'asc'},

	});
	return NextResponse.json(products);
}