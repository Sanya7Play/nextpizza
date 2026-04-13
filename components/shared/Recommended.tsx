'use client'
import ProductItem from "@/components/shared/ProductItem";
import type { Prisma } from "@/generated/prisma/client";
import {useEffect} from "react";
import {useProviders} from "@/components/shared/context/CategoryFilter";

type ProductWithIngredients = Prisma.ProductGetPayload<{
	include: { ingredients: true };
}>;

interface PropsProduct {
	recommendProducts: ProductWithIngredients[];
	category: string;
}

export default function Recommended({recommendProducts, category}:PropsProduct) {
	const {setLoading} = useProviders();
	useEffect(() => {
		setLoading(true);
		try {
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
		}
		catch (err){

		}
		finally {
			setLoading(false);
		}


	},[recommendProducts, setLoading]);

	return(
		<div className='flex flex-col gap-3 w-full mr-18 my-10'>
			<h1 className='font-bold text-3xl'>Рекомендации</h1>
			<div className={'grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] last:mb-5'}>
				{recommendProducts.map((product) => (
					<ProductItem
						key={product.id}
						name={product.name}
						price={product.price}
						image={product.imageUrl}
						imageAlt={product.name}
						id={product.id}
						ingredients={product.ingredients ?? []}
						description={product.description ?? ''}
						category={category}
					/>
				))}
			</div>
		</div>
	)
}