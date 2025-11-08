import ProductItem from "./ProductItem";
import Title from "@/components/shared/Title";
export default function ProductsGroupList() {
	return(
		<div className='flex flex-col gap-3 w-full mr-18'>
			<Title text='Пиццы'/>
			<div className='grid grid-cols-3 gap-20 w-auto h-auto pb-5'>
				<ProductItem/>
				<ProductItem/>
				<ProductItem/>
				<ProductItem/>
			</div>
		</div>
	)
}