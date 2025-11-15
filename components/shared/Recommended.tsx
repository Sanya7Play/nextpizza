'use client'
import ProductItem from "@/components/shared/ProductItem";
import {Ingredients, Product} from ".prisma/client";
import {useEffect, useState} from "react";

interface PropsProduct {
	recommendProducts: Product[];
	ingredients: Ingredients[];
}

export default function Recommended({recommendProducts, ingredients}:PropsProduct) {

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
						ingredients={ingredients}
					/>
				))}
			</div>
		</div>
	)
}