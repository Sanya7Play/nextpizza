import {Prisma} from "@/generated/prisma";


export type OrderWithItems = Prisma.OrderGetPayload<{
	include: {
		items: {
			include: {
				product: true;
				supplements: true;
			};
		};
	};
}>;