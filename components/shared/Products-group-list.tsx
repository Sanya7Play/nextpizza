'use client'
import ProductItem from "./ProductItem";
import Title from "@/components/shared/Title";
import axios from "axios";
import { useEffect, useState} from "react";
import {Ingredient} from "@/generated/prisma/client";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import {categories} from "@/components/constants/pizza";


interface Product {
	name: string;
	price: number;
	imageUrl: string;
	imageAlt?: string;
	id: number;
	ingredients?: Ingredient[];
	category: { name: string; };
	description: string;
}
export default function ProductsGroupList() {

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const {selectedCategory} = useProviders();

	useEffect(() => {
		async function getProducts() {
			setLoading(true)
			try {
				const {data} = await axios.get<Product[]>('/api/products', {params: {categoryId: selectedCategory}});
				setProducts(data);
				console.log('Загрузка данных');
				await new Promise((r) => setTimeout(r, 1000));
			}
			finally {
				setLoading(false)
			}
		}
		getProducts();

	}, [selectedCategory]);

	const title = selectedCategory === 0 ? 'Все товары' : categories.find((
		category, index) => index === selectedCategory);
	return(
		<div className='flex flex-col gap-3 w-full mr-18'>
			<Title text={title ? title : 'Все товары'} />
			<div className='grid grid-cols-3 gap-4 w-auto h-auto pb-1 lg:grid-cols-2'>
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
						description={product.description}
					/>
				))}
			</div>
		</div>
	)
}