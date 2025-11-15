'use client'
import ProductItem from "./ProductItem";
import Title from "@/components/shared/Title";
import axios from "axios";
import {useEffect, useState} from "react";
import {Ingredients} from ".prisma/client";

interface Product {
	name: string;
	price: number;
	imageUrl: string;
	imageAlt?: string;
	id: number;
}

export default function ProductsGroupList() {

	const [products, setProducts] = useState<Product[]>([]);
	const [ingredients, setIngredients] = useState<Ingredients[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [order, setOrder] = useState<Product[]>([]);

	useEffect(() => {
		async function getProducts() {
			setLoading(true);
			const responseProducts = await axios.get('/api/products');
			const responseIngredients = await axios.get('/api/ingredients');
			console.log(responseIngredients.data);
			console.log(responseProducts.data);
			setIngredients(responseIngredients.data);
			setProducts(responseProducts.data);
			if (responseProducts.data.length > 0){
				setTimeout(() => setLoading(false), 2000);
			}
		}
		getProducts().then(r => console.log('Загрузка данных'));
	}, []);
	return(
		<div className='flex flex-col gap-3 w-full mr-18'>
			<Title text='Пиццы'/>
			<div className='grid grid-cols-3 gap-5 w-auto h-auto pb-1	'>
				{products.map((product) => (
					<ProductItem
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.price}
						image={product.imageUrl}
						imageAlt={product.name}
						loading={loading}
						ingredients={ingredients}
					/>
				))}
			</div>
		</div>
	)
}