import {NextResponse} from "next/server";
import {RegisterSchema} from "@/types/schemas";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request){
	const body = await req.json();
	const parsed = RegisterSchema.safeParse(body);
	console.log(parsed.data)
	if (!parsed.success){
		return Response.json({error: parsed.error.message})
	}
	const {email, password, fullName} = parsed.data;

	const userExisting = await prisma.user.findFirst({
		where: {
			email: email,
		},
		select: {
			email: true,
		}
	})
	if (userExisting){
		return Response.json({error: 'Email уже существует'}, {status: 400})
	}
	const passwordHash = await bcrypt.hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			email,
			fullName,
			password: passwordHash
		}
	})
	console.log(newUser)
	return NextResponse.json(body)
}