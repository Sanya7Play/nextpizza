'use client'
import {ArrowUpDown} from "lucide-react";
import PopoverSort from "@/components/shared/PopoverSort";
import {useProviders} from "@/components/shared/context/CategoryFilter";

export default function Sort() {
	const { sort, setSort } = useProviders()
	const handleSort = (sort: string) => {
		setSort(sort)
	}
	return(
		<div className='flex flex-row items-center gap-2 bg-neutral-300/40 w-auto p-4.5 rounded-2xl'>
			<ArrowUpDown size={16}/>
			<p className='font-bold'>Сортировка: </p>
			<PopoverSort onChange={handleSort}>
				<span className='text-primary cursor-pointer'>{sort}</span>
			</PopoverSort>
		</div>
	)
}