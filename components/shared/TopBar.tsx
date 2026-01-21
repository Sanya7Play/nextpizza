
import Categories from "@/components/shared/Categories";
import Sort from "@/components/shared/Sort";
import Title from "@/components/shared/Title";


export default function TopBar() {



	return(
		<div className='flex flex-col px-18 py-5'>
			<Title text='Все пиццы'/>
			<div className='flex flex-row items-center justify-between gap-3'>
				<Categories/>
				<Sort/>
			</div>
		</div>
	)
}