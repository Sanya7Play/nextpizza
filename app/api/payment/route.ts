import axios from "axios";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	const {data} = await axios.post('https://api.yookassa.ru/v3/payments',
		{
		amount: {
			value: body.totalPrice,
			currency: 'RUB',
		},
		capture: true,
		confirmation: {
			type: "redirect",
			return_url: "http://localhost:3000/orders"
		},
		description: `Заказ №${body.orderId}`,
		},
		{
			auth: {
				username: process.env.YOUKASSA_API_SHOP!,
				password: process.env.YOUKASSA_API_KEY!
			},
			headers: {
				'Content-Type': 'application/json',
				"Idempotence-Key": crypto.randomUUID(),
			}
		}
		);
	return NextResponse.json(data);
}
