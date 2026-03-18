import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import OrderCard from "@/components/shared/OrderCard";
import {OrderWithItems} from "@/types/order";
import OrderSkeleton from "@/components/shared/OrderSkeleton";
import {product} from "remeda";


interface OrderProps {
	id: number;
	createdAt: Date;
	status: string;
	totalPrice: number;
	items: OrderWithItems["items"];
	loading: boolean;
}
export default function Order({id, createdAt, status, totalPrice, items, loading}: OrderProps){
	const numberDate = new Date(createdAt).toLocaleDateString('ru-RU', {
		day: 'numeric', month: 'long', year: 'numeric',hour: 'numeric', minute: 'numeric',
	}).replace(' г.', ',')
	console.log(numberDate);
	return (
		<>
			{loading ? (<OrderSkeleton/>) : (
				<Accordion
					type="single"
					collapsible
					className="w-240 rounded-4xl bg-neutral-300/20 shadow-lg"
					defaultValue="item-1"
				>
					<AccordionItem value="item-2" className='p-5' key={id}>
						<AccordionTrigger>
							<div className="flex flex-row justify-between w-full pb-2 px-5">
								<div className="flex flex-row items-center gap-5">
									<h1 className='text-2xl font-bold'>Заказ #{id}</h1>
									<p className='text-base text-muted-foreground'>{numberDate}</p>
								</div>
								{status === 'PENDING' ? (<Badge variant='destructive'>В ожидании</Badge>) : (status === 'PAID' ? (<Badge variant='default'>Оплачено</Badge>) : (<Badge variant='secondary'>Отклонено</Badge>)) }
							</div>
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-3 text-balance">
							{items.map((item) => (
								<OrderCard
									key={item.id}
									id={item.id}
									name={item.product.name}
									image={item.product.imageUrl}
									category={item.product.categoryId}
									quantity={item.quantity}
									price={item.product.price}
									supplements={item.supplements}
								/>
							))}
							<div className="flex flex-row items-center px-5 gap-1">
								<p className='text-xl'>Итого:</p>
								<p className='flex flex-row items-center text-xl font-bold'>
									{totalPrice} ₽
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			)}
		</>

	)
}