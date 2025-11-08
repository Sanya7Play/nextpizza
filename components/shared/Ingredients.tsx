import Image from "next/image";
import {RussianRuble} from "lucide-react";

export default function Ingredients() {
	return (
		<div className='group flex flex-col items-center rounded-2xl cursor-pointer gap-3 px-3 py-3 shadow-lg group-active:border-chart-1'>
			<Image src='/image10.png' alt='ProductImage' width={110} height={110} />
			<p className='text-xs'>Сырный бортик</p>
			<span className='text-sm flex flex-row items-center'>179 <RussianRuble size={14}/></span>
		</div>
	)
}