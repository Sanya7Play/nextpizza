import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {CartItem} from "@/components/store/cart";
import {Ingredient} from "@/generated/prisma";

export async function GET(req: Request){

	const {searchParams} = new URL(req.url);
	const user = searchParams.get('user');
	const userFind = user ? Number(user) : 0;

	const orders = await prisma.order.findMany({
		where: {
			userId: userFind,
		},
		include: {
			items: {
				include: {
					product: {
						select: {
							id: true,
							name: true,
							price: true,
							imageUrl: true,
							categoryId: true,
						}
					},
					supplements: true,
				}
			}
		}
	});
	return NextResponse.json(orders);
}

export async function POST(req: Request) {
	const body = await req.json();

	const {searchParams} = new URL(req.url);
	const user = searchParams.get('user');
	const userFind = user ? Number(user) : 0;
	const order = await prisma.order.create({
		data: {
			userId: userFind,
			totalPrice: body.totalPrice,
			paymentId: body.paymentId,
			items: {
				create: body.items.map((item: CartItem) => ({
					productId: item.productId,
					quantity: item.quantity,
					key: item.key,
					size: item.size,
					supplements: item.ingredients?.length
						? {
							connect: item.ingredients.map((i: Ingredient) => ({ id: i.id })),
						}
						: undefined,
				}))
			},
		},
		include: {
			items: true,
		},
	});
	return NextResponse.json(order)
}