import Header from "@/components/shared/Header";
import WindowCardBreadCrumb from "@/components/shared/WindowCardBreadCrumb";
import WindowCardItem from "@/components/shared/WindowCardItem";
import { prisma } from "@/lib/prisma";
import Recommended from "@/components/shared/Recommended";
import {notFound} from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{id: string}> }) {

	const { id } = await params;
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
		},
	});

	if (!product) notFound();

	const recommendProducts = await prisma.product.findMany({
		where:{
			categoryId: product.categoryId,
			NOT: {id: product.id}
		},
		include:{
			ingredients: true
		},
		take: 4,
	})
	return (
		<div className="mx-20 bg-white rounded-4xl min-h-screen lg:mx-20">
			<Header buttonHide={true} searchHide={false}/>
			<div className="flex flex-col mx-18 mt-5 min-h-screen gap-5">
				<WindowCardBreadCrumb
					product={product}
				/>
				<WindowCardItem
					product={product}
					ingredients={product.ingredients ?? []}
				/>
				<Recommended
					recommendProducts={recommendProducts}
				/>
			</div>
		</div>
	)
}