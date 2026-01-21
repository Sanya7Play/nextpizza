'use client'
import ProductItem from "@/components/shared/ProductItem";
import type { Prisma } from "@/generated/prisma/client";
import {useEffect, useState} from "react";

type ProductWithIngredients = Prisma.ProductGetPayload<{
	include: { ingredients: true };
}>;

interface PropsProduct {
	recommendProducts: ProductWithIngredients[];
}

export default function Recommended({recommendProducts}:PropsProduct) {

	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		async function getProduct(){
			if(recommendProducts.length > 0){
				setLoading(true);
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
			else{
				setLoading(false);
			}
		}
		getProduct()
	},[recommendProducts])

	return(
		<div className='flex flex-col gap-3 w-full mr-18 my-10'>
			<h1 className='font-bold text-3xl'>Рекомендации</h1>
			<div className={'grid grid-cols-4 gap-15 w-auto h-auto md:gap-5'}>
				{recommendProducts.map((product) => (
					<ProductItem
						key={product.id}
						name={product.name}
						price={product.price}
						image={product.imageUrl}
						imageAlt={product.name}
						id={product.id}
						loading={loading}
						ingredients={product.ingredients ?? []}
					/>
				))}
			</div>
		</div>
	)
}