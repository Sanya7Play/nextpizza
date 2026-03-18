import {Resend} from "resend";
import {OrderEmail} from "@/components/OrderEmail";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	const body = await req.json();
	const {email, deliveryPrice, totalPrice} = body;
	try {
		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: [`${email}`],
			subject: 'Подтверждение заказа ',
			react: OrderEmail({deliveryPrice, totalPrice}),
		});

		if (error) {
			console.log(error);
			return Response.json({ error }, { status: 500 });
		}

		return Response.json(data);
	} catch (error) {
		console.log(error);
		return Response.json({ error }, { status: 500 });
	}
}