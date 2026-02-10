import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
	const users = await prisma.user.findMany({
		select: { id: true, email: true}
	});
	return NextResponse.json(users);
}
// export async function POST(){
// 	const createNewUser = await prisma.user.create({
// 		data: {
// 			fullName: 'test',
// 		}
// 	});
// 	console.log(createNewUser);
// 	return NextResponse.json(createNewUser);
// }