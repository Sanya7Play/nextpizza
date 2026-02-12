import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: Request){
	const {searchParams} = new URL(req.url);
	const email = searchParams.get('email');
	const emailFind = email ? String(email) : '';
	const users = await prisma.user.findFirst({
		where: {email: emailFind},
		select: {
			id: true,
			email: true,
			fullName: true,
			userId: true,
			telephone: true,
			address: true,
			apartment: true,
		}
	});
	console.log(users)
	return NextResponse.json(users);
}
export async function PATCH(req: Request){
	const body = await req.json();

	const updateUser = await prisma.user.update({
		where: {
			email: body.email,
		},
		data: body
	});
	console.log(updateUser)
	return NextResponse.json(body)
}