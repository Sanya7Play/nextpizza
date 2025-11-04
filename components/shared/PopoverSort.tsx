import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import Link from "next/link";

export default function PopoverSort({children}: { children: React.ReactNode}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				{children}
			</PopoverTrigger>
			<PopoverContent className="w-35">
				<div className="flex flex-col justify-between gap-4">
					<Link href=''>популярности</Link>
					<Link href=''>по цене</Link>
					<Link href=''>по алфавиту</Link>
				</div>
			</PopoverContent>
		</Popover>
	)
}
