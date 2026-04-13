import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import React from "react";
import {useProviders} from "@/components/shared/context/CategoryFilter";

interface IProps {
	children: React.ReactNode;
}
export default function PopoverTime({children}: IProps) {
	const {setTimeDelivery, timeArray} = useProviders();
	const handleTime = (item: string) => {
		setTimeDelivery(item)
	}
	return(
		<Popover>
			<PopoverTrigger asChild>
				{children}
			</PopoverTrigger>
			<PopoverContent className="w-40">
				<div className="flex flex-col justify-between gap-4">
					{timeArray.map((item, index) => (
						<span
							key={index}
							className='hover:text-primary cursor-pointer'
							onClick={() => handleTime(item)}>
							{item}
						</span>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}