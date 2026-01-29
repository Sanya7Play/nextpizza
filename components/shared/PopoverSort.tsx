
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {sortArray} from "@/components/constants/pizza";
import React from "react";

interface propsPopoverSort {
	children: React.ReactNode;
	onChange: (value: string) => void;
}

export default function PopoverSort({children, onChange}: propsPopoverSort) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				{children}
			</PopoverTrigger>
			<PopoverContent className="w-40">
				<div className="flex flex-col justify-between gap-4">
					{sortArray.map((item, index) => (
						<span
							key={index}
							className='hover:text-primary cursor-pointer'
							onClick={() => onChange(item.name)}>
							{item.name}
						</span>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}
