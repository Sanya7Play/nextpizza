import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Minus, Plus, RussianRuble, Trash2} from "lucide-react";
import {ICartItem} from "@/components/constants/pizza";

export default function CartItem() {
	return(
		<div className='flex flex-row gap-3 py-5'>
			<div className='flex flex-col items-center justify-center'>
				<Image src='/assets/images/products/burger-pizza.avif' alt='Image' width={85} height={85}/>
			</div>
			<div className='flex flex-col'>
				<div className='flex flex-col mb-3 border-b pb-3'>
					<h1 className='text-base font-bold'>
						Чизбургер Пицца
					</h1>
					<p className='text-sm text-muted-foreground'>
						Средняя 30 см, традиционное тесто
					</p>
				</div>
				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-row items-center gap-3'>
						<Button variant='outline' size='sm' className='py-0.5 px-2 cursor-pointer'>
							<Minus size={17}/>
						</Button>
						<p className='font-bold'>2</p>
						<Button variant='outline' size='sm' className='py-0.5 px-2 cursor-pointer'>
							<Plus size={17}/>
						</Button>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<span className='flex flex-row items-center text-base font-bold gap-0.5'>965
							<RussianRuble size={14} strokeWidth={3}/>
						</span>
						<Trash2 color='grey' strokeWidth={2} size={16} className='cursor-pointer'/>
					</div>
				</div>
			</div>
		</div>
	)
}