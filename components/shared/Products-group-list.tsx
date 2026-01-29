'use client'
import ProductItem from "./ProductItem";
import Title from "@/components/shared/Title";
import axios from "axios";
import { useEffect, useState} from "react";
import {Ingredient} from "@/generated/prisma/client";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import {categories} from "@/components/constants/pizza";
import PaginationHome from "@/components/shared/paginationHome";


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
	const [activePage, setActivePage] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number[]>([1,2,3,4]);

	const {selectedCategory, sort, search} = useProviders();

	useEffect(() => {
		async function getProducts() {
			setLoading(true)
			try {
				const {data} = await axios.get<Product[]>(`/api/products`,
					{params: {categoryId: selectedCategory, sort: sort, query: search, page: currentPage}});
				setProducts(data);
				console.log('Загрузка данных');
				await new Promise((r) => setTimeout(r, 600));
			}
			finally {
				setLoading(false)
			}
		}
		getProducts();

	}, [selectedCategory, sort, search, currentPage]);
	const changePagePlus = () => {
		setActivePage(prevPage => prevPage + 1);
		setCurrentPage(prevState => prevState + 6)

	}
	const changePageMinus = () => {
		setActivePage(prevPage => prevPage - 1);
		setCurrentPage(prevState => prevState -	 6)

	}
	console.log(activePage, currentPage);
	const title = selectedCategory === 0 ? 'Все товары' : categories.find((
		category, index) => index === selectedCategory);
	return(
		<div className='flex flex-col gap-3 w-full mr-18'>
			<Title text={title ? title : 'Все товары'} />
			<div className='grid 2xl:grid-cols-2 gap-4 w-auto h-auto pb-1 xl:grid-cols-2 last:mb-5'>
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
						category={product.category.name}
					/>
				))}
			</div>
			{products.length > 0 && (
				<div className='my-8'>
					<PaginationHome
						page={activePage}
						pageSize={pageSize}
						changePagePlus={changePagePlus}
						changePageMinus={changePageMinus}
					/>
				</div>
			)}

		</div>
	)
}