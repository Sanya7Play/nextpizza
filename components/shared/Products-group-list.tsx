'use client'
import ProductItem from "./ProductItem";
import Title from "@/components/shared/Title";
import axios from "axios";
import {useEffect, useMemo, useState} from "react";
import {Ingredient} from "@/generated/prisma/client";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import {categories} from "@/components/constants/pizza";
import PaginationHome from "@/components/shared/PaginationHome";
import ProductSkeleton from "@/components/shared/ProductSkeleton";

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
export type ProductTotal = {
	total: number;
	products: Product[];
}
export default function ProductsGroupList() {

	const {selectedCategory, sort, search, loading, setLoading} = useProviders();
	const [products, setProducts] = useState<Product[]>([]);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	const take = search ? 5 : 6;

	const totalPages = useMemo(() => Math.max(1, Math.ceil(total / take)), [total, take]);

	const windowSize = 3;
	const windowIndex = Math.floor((page - 1) / windowSize);
	const start = windowIndex * windowSize + 1;
	const end = Math.min(totalPages, start + windowSize - 1);

	const pageSize = useMemo(
		() => Array.from({ length: end - start + 1 }, (_, i) => start + i),
		[start, end]
	);

	useEffect(() => {
		const controller = new AbortController();
		async function getProducts() {
			setLoading(true);
			try {
				const {data} = await axios.get<ProductTotal>(`/api/products`,
					{params: {categoryId: selectedCategory, sort: sort, page, take}, signal: controller.signal});
				console.log(data);
				setProducts(data.products);
				setTotal(data.total);
			}
			catch (err){
				if (axios.isCancel(err)) return;
				console.error('Не удалось загрузить товары', err);
			}
			finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}
		getProducts();

		return () => controller.abort();
	}, [selectedCategory, sort, page, setLoading, take]);
	const changePagePlus = () => {
		if (page < totalPages) setPage((p) => p + 1);
	}
	const changePageMinus = () => {
		if (page > 1) setPage((p) => p - 1);
	}
	const changePage = (page: number) => {
		setPage(page);
	}
	const title = selectedCategory === 0 ? 'Все товары' : categories.find((
		category, index) => index === selectedCategory);
	return(
		<div className='flex flex-col gap-3 w-full mr-18'>
			<Title text={title ? title : 'Все товары'} />
			<div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(320px,1fr))] last:mb-5">
				{loading ? (
					Array.from({ length: 6 }).map((_, i) => (
						<ProductSkeleton key={i} />
					))
				) : (
					products.map((product) => (
						<ProductItem
							key={product.id}
							id={product.id}
							name={product.name}
							price={product.price}
							image={product.imageUrl}
							imageAlt={product.name}
							ingredients={product.ingredients ?? []}
							description={product.description}
							category={product.category.name}
						/>
					))
				)}

			</div>
			{products.length > 0 && (
				<div className='my-8'>
					<PaginationHome
						page={page}
						pageSize={pageSize}
						changePagePlus={changePagePlus}
						changePageMinus={changePageMinus}
						changePage={changePage}
					/>
				</div>
			)}
		</div>
	)
}