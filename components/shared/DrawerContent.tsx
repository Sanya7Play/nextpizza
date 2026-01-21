import FilingData from "@/components/shared/FilingData";
import Total from "@/components/shared/Total";
import Title from "@/components/shared/Title";
export default function DrawerContent() {
	return(
		<div className='flex flex-col mx-20 py-10'>
			<Title text='Оформление заказа'/>
			<div className='grid grid-cols-2 gap-10 justify-between mx-10 mt-12'>
				<FilingData/>
				<Total/>
			</div>
		</div>
	)
}