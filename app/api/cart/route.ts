import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
	const cart = await prisma.cart.findMany();
	return NextResponse.json(cart);
}