'use client'
import ProductItem from "./ProductItem";
import Title from "@/components/shared/Title";
import axios from "axios";
import {useEffect, useState} from "react";
import {Ingredient} from "@/generated/prisma/client";

interface Product {
	name: string;
	price: number;
	imageUrl: string;
	imageAlt?: string;
	id: number;
	ingredients?: Ingredient[];
}
export default function ProductsGroupList() {

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function getProducts() {
			setLoading(true)
			try {
				const {data} = await axios.get<Product[]>('/api/products');
				setProducts(data);
				console.log('Загрузка данных');
				await new Promise((r) => setTimeout(r, 1000));
			}
			finally {
				setLoading(false)
			}
		}
		getProducts();

	}, []);
	console.log(products);
	return(
		<div className='flex flex-col gap-3 w-full mr-18'>
			<Title text='Пиццы'/>
			<div className='grid grid-cols-3 gap-1 w-auto h-auto pb-1'>
				{products.map((product) => (
					<ProductItem
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.price}
						image={product.imageUrl}
						imageAlt={product.name}
						loading={loading}
						ingredients={product.ingredients ?? []}
					/>
				))}
			</div>
		</div>
	)
}