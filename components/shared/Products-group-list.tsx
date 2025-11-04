import ProductItem from "./ProductItem";
export default function ProductsGroupList() {
	return(
		<div className='flex flex-col gap-3 w-full mr-18'>
			<h1 className='text-4xl font-extrabold'>Пиццы</h1>
			<div className='grid grid-cols-3 gap-10 w-auto h-auto'>
				<ProductItem/>
			</div>
		</div>
	)
}