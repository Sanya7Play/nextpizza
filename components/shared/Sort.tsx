import {ArrowUpDown} from "lucide-react";
import PopoverSort from "@/components/shared/PopoverSort";

export default function Sort() {
	return(
		<div className='flex flex-row items-center gap-2 bg-neutral-100 w-auto p-4 rounded-2xl'>
			<ArrowUpDown size={16}/>
			<p className='font-bold'>Сортировка: </p>
			<PopoverSort>
				<span className='text-primary cursor-pointer'>популярное</span>
			</PopoverSort>
		</div>
	)
}