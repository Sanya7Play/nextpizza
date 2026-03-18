import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(req: Request){
	const cart = await prisma.cart.findFirst({});
	return NextResponse.json(cart);
}
