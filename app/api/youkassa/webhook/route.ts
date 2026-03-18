import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	try {

		const event = body?.event;
		const paymentId = body?.object?.id;

		if (event === 'payment.succeeded') {
			await prisma.order.updateMany({
				where: {
					paymentId: paymentId
				},
				data: {status: 'PAID'},
			});
			return NextResponse.json('200', {status: 200});
		}
		if (event === 'payment.canceled') {
			await prisma.order.updateMany({
				where: {
					paymentId: paymentId
				},
				data: {status: 'CANCELLED'},
			});
			return NextResponse.json('200', {status: 200});
		}
	}
	catch (err){
		return NextResponse.json('200', {status: 200});
	}
}