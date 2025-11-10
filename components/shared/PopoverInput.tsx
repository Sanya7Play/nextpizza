import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Link from "next/link";

export default function PopoverInput({children}: {children: React.ReactNode}) {
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent className="w-250 rounded-2xl h-auto 2xl:w-180 xl:w-110 lg:w-60 md:w-50">
				<div className="flex flex-col justify-between gap-4">
					<Link href='' className='hover:text-primary'>Чизбургер-пицца</Link>
					<Link href='' className='hover:text-primary'>Острая чизбургер-пицца</Link>
				</div>
			</PopoverContent>
		</Popover>
	)
}