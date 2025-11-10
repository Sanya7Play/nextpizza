import Header from "@/components/shared/Header";
import WindowCardBreadCrumb from "@/components/shared/WindowCardBreadCrumb";
import WindowCardItem from "@/components/shared/WindowCardItem";
import {prisma} from "@/prisma/prisma-client";
import NotFound from "@/app/not-found";
import Recommended from "@/components/shared/Recommended";

export default async function ProductPage({ params }: { params: Promise<{id: string}> }) {

	const { id } = await params;
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
	});
	
	if (!product) NotFound();

	const recommendProducts = await prisma.product.findMany({
		where:{
			categoryId: product?.categoryId,
		},
		take: 4,
	})
	return (
		<div className="mx-20 bg-white rounded-4xl min-h-screen lg:mx-20">
			<Header buttonHide={true} searchHide={false}/>
			<div className="flex flex-col mx-18 mt-10 min-h-screen gap-10">
				<WindowCardBreadCrumb product={product} />
				<WindowCardItem product={product}/>
				<Recommended recommendProducts={recommendProducts}/>
			</div>
		</div>
	)
}