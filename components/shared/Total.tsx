"use client"
import {ArrowRight, Package, Percent, Truck} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCartStore} from "@/components/store/cart";
import {deliveryPrice, percent} from "@/components/constants/pizza";

export default function Total() {
	const totalprice = useCartStore(state => state.totalPrice);

	const totalCardPrice = percent * totalprice + 250;
	return (
		<div className='flex flex-col w-170 h-121 bg-neutral-300/20 rounded-xl gap-3 p-10'>
			<div className='flex flex-col w-auto h-auto pb-5 p-10 gap-2'>
				<h1 className='text-xl'>Итого:</h1>
				<span className='flex flex-row items-center gap-2 text-4xl font-extrabold'>{totalCardPrice.toFixed(2)} ₽</span>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row justify-between items-center gap-2'>
						<div className='flex flex-row items-center gap-2'>
							<Package size={16} color='grey'/>
							<p className='flex flex-row items-center text-lg text-muted-foreground'>Cтоимость корзины:</p>
						</div>
						<p className='border-b border-dashed border-gray-400 w-53 p-2 mx-1'></p>
						<span className='flex flex-row items-center gap-0.5 font-bold'>{totalprice} ₽</span>
					</div>
					<div className='flex flex-row justify-between items-center gap-2'>
						<div className='flex flex-row items-center gap-2'>
							<Percent size={16} color='grey'/>
							<p className='flex flex-row items-center text-lg text-muted-foreground'>Налог:</p>
						</div>
						<p className='border-b border-dashed border-gray-400 w-80 p-2 mx-1'></p>
						<span className='flex flex-row items-center gap-0.5 font-bold'>{((totalprice * percent) - totalprice).toFixed(2)} ₽</span>
					</div>
					<div className='flex flex-row justify-between items-center gap-2 pb-10'>
						<div className='flex flex-row items-center gap-2'>
							<Truck size={16} color='grey'/>
							<p className='flex flex-row items-center text-lg text-muted-foreground'>Доставка:</p>
						</div>
						<p className='border-b border-dashed border-gray-400 w-78 p-2 mx-1'></p>
						<span className='flex flex-row items-center gap-0.5 font-bold'>{deliveryPrice} ₽</span>
					</div>
					<Button variant='default' size='lg' className='w-full py-6 rounded-xl cursor-pointer'>
						<p className='flex flex-row items-center text-lg gap-2'>Оформить заказ<ArrowRight size={20}/></p>
					</Button>
				</div>
			</div>
		</div>
	)
}