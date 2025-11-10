import ProductItem from "@/components/shared/ProductItem";
import {Product} from ".prisma/client";
import {prisma} from "@/prisma/prisma-client";

interface PropsProduct {
	product: Product;
}

export default function Recommended({product}: PropsProduct) {

	async function limitProducts() {

		const products = prisma.products.findMany({
			where: {
				categoryId: product.id,
			}

		});
	}
	return(
		<div className='flex flex-col gap-3 w-full mr-18 my-10'>
			<h1 className='font-bold text-3xl'>Рекомендации</h1>
			<div className={'grid grid-cols-4 gap-15 w-auto h-auto'}>
				<ProductItem/>
				<ProductItem/>
				<ProductItem/>
				<ProductItem/>
			</div>
		</div>
	)
}