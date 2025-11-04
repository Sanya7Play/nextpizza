import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import Link from "next/link";

export default function PopoverMenu({children}: { children: React.ReactNode}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				{children}
			</PopoverTrigger>
			<PopoverContent className="w-35">
				<div className="flex flex-col justify-between gap-4">
					<Link href=''>Настройки</Link>
					<Link href='' className='pb-2 border-b border-gray-200'>Заказы</Link>
					<Link href=''>Выйти</Link>
				</div>
			</PopoverContent>
		</Popover>
	)
}
