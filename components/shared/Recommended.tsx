import ProductItem from "@/components/shared/ProductItem";

export default function Recommended() {
	return(
		<div className='flex flex-col gap-3 w-full mr-18 my-10'>
			<h1 className='font-bold text-3xl'>Рекомендации</h1>
			<div className={ 'grid grid-cols-4 gap-15 w-auto h-auto'}>
				<ProductItem/>
				<ProductItem/>
				<ProductItem/>
				<ProductItem/>
			</div>
		</div>
	)
}