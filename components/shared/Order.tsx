import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import OrderCard from "@/components/shared/OrderCard";
import {RussianRuble} from "lucide-react";

export default function Order(){
	return (
		<Accordion
			type="single"
			collapsible
			className="w-240 rounded-4xl bg-neutral-200/60 shadow-lg"
			defaultValue="item-1"
		>
			<AccordionItem value="item-2" className='p-5'>
				<AccordionTrigger>
					<div className="flex flex-row pb-2 px-5">
						<div className="flex flex-row items-center gap-5 mr-106">
							<h1 className='text-2xl font-bold'>Заказ #15</h1>
							<p className='text-base text-muted-foreground'>16 февраля 2024, в 20:31</p>
						</div>
						<Badge variant='default'>Оплачено</Badge>
					</div>
				</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-3 text-balance">
					<OrderCard/>
					<OrderCard/>
					<OrderCard/>
					<div className="flex flex-row items-center px-5 gap-1">
						<p className='text-xl'>Итого:</p>
						<p className='flex flex-row items-center text-xl font-bold'>
							2245
							<RussianRuble size={16} strokeWidth={3}/>
						</p>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}