'use client'
import ProductItem from "./ProductItem";
import Title from "@/components/shared/Title";
import axios from "axios";
import {useEffect, useState} from "react";

interface Product {
	name: string;
	price: number;
	imageUrl: string;
	imageAlt?: string;
	id: number;
}

export default function ProductsGroupList() {

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getProducts() {

			setLoading(true);

			const response = await axios.get('/api/products');
			console.log(response.data);
			setProducts(response.data);
			if (response.data.length > 0){
				setTimeout(() => setLoading(false), 3000);
			}
		}
		getProducts();
	}, []);

	return(
		<div className='flex flex-col gap-3 w-full mr-18'>
			<Title text='Пиццы'/>
			<div className='grid grid-cols-3 gap-20 w-auto h-auto pb-1'>
				{products.map((product) => (
					<ProductItem
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.price}
						image={product.imageUrl}
						imageAlt={product.name}
						loading={loading}
					/>
				))}
			</div>
		</div>
	)
}