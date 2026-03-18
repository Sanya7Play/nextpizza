import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request){
	const {searchParams} = new URL(req.url);

	const show = searchParams.get("show") === "true";

	const ingredients = await prisma.ingredient.findMany({
		take: show ? 22 : 5,
	});
	return NextResponse.json(ingredients);
}
