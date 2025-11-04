import Categories from "@/components/shared/Categories";
import Sort from "@/components/shared/Sort";

export default function TopBar() {
	return(
		<div className='flex flex-col px-18 py-5'>
			<h1 className='font-extrabold text-4xl'>Все пиццы</h1>
			<div className='flex flex-row items-center justify-between gap-3'>
				<Categories/>
				<Sort/>
			</div>
		</div>
	)
}