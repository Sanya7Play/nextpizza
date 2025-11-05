import {ArrowRight, Clock, Package, Percent, RussianRuble, Trash2, Truck} from "lucide-react";
import PurchaseCard from "@/components/shared/PurchaseCard";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export default function DrawerContent() {
	return(
		<div className='flex flex-col mx-20 py-10'>
			<h1 className='text-4xl font-extrabold mb-12'>Оформление заказа</h1>
			<div className='flex flex-row gap-10'>
				<div className='flex flex-col gap-10'>
					<div className='flex flex-col w-auto h-auto bg-neutral-100 rounded-xl gap-3'>
						<header className='flex flex-row justify-between w-200 border-b border-neutral-200 pb-5 p-8'>
							<h1 className='font-bold text-2xl'>1. Корзина</h1>
							<p className='flex flex-row items-center gap-1 text-base text-muted-foreground'><Trash2 size={16}/>Очистить корзину</p>
						</header>
						<PurchaseCard/>
						<PurchaseCard/>
						<PurchaseCard/>
					</div>
					<div className='flex flex-col w-auto h-auto bg-neutral-100 rounded-xl gap-3'>
						<header className='flex flex-row w-200 border-b border-neutral-300 pb-5 p-8'>
							<h1 className='font-bold text-2xl'>2. Персональные данные</h1>
						</header>
						<div className='grid grid-cols-2 gap-8 p-8'>
							<Input type='text' placeholder='Имя' className='h-11'/>
							<Input type='text' placeholder='Фамилия' className='h-11'/>
							<Input type='email' placeholder='E-mail' className='h-11'/>
							<Input type='tel' placeholder='Телефон' className='h-11'/>
						</div>
					</div>
					<div className='flex flex-col w-auto h-auto bg-neutral-100 rounded-xl gap-3'>
						<header className='flex flex-row w-200 border-b border-neutral-300 pb-5 p-8'>
							<h1 className='font-bold text-2xl'>3. Адрес доставки</h1>
						</header>
						<div className='flex flex-col gap-8 pt-8 pb-2 px-8'>
							<Input type='text' placeholder='Адрес' className='h-11'/>
							<Textarea placeholder="Комментарий к заказу" className='min-h-30'/>
						</div>
						<div className='flex flex-col px-8 py-4 gap-2'>
							<p>Время доставки</p>
							<span className='flex flex-row gap-2'><Clock/>Доставка в 11:00</span>
						</div>
					</div>
				</div>
				<div className='flex flex-col w-150 h-150 bg-neutral-100 rounded-xl gap-3 p-10'>
					<div className='flex flex-col w-auto h-auto pb-5 p-10 gap-2'>
						<h1 className='text-xl'>Итого:</h1>
						<span className='flex flex-row items-center gap-2 text-4xl font-extrabold'>820.4 <RussianRuble size={32} strokeWidth={3}/></span>
						<div className='flex flex-col gap-2'>
							<div className='flex flex-row justify-between items-center gap-2'>
								<div className='flex flex-row items-center gap-2'>
									<Package size={16} color='grey'/>
									<p className='flex flex-row items-center text-lg text-muted-foreground'>Cтоимость корзины:</p>
								</div>
								<p className='border-b border-dashed border-gray-400 w-53 p-2 mx-1'></p>
								<span className='flex flex-row items-center gap-0.5 font-bold'>495<RussianRuble size={14} strokeWidth={3}/></span>
							</div>
							<div className='flex flex-row justify-between items-center gap-2'>
								<div className='flex flex-row items-center gap-2'>
									<Percent size={16} color='grey'/>
									<p className='flex flex-row items-center text-lg text-muted-foreground'>Налог:</p>
								</div>
								<p className='border-b border-dashed border-gray-400 w-90 p-2 mx-1'></p>
								<span className='flex flex-row items-center gap-0.5 font-bold'>495<RussianRuble size={14} strokeWidth={3}/></span>
							</div>
							<div className='flex flex-row justify-between items-center gap-2 pb-10'>
								<div className='flex flex-row items-center gap-2'>
									<Truck size={16} color='grey'/>
									<p className='flex flex-row items-center text-lg text-muted-foreground'>Доставка:</p>
								</div>
								<p className='border-b border-dashed border-gray-400 w-78 p-2 mx-1'></p>
								<span className='flex flex-row items-center gap-0.5 font-bold'>250<RussianRuble size={14} strokeWidth={3}/></span>
							</div>
							<Button variant='default' size='lg' className='w-full py-6 rounded-xl cursor-pointer'>
								<p className='flex flex-row items-center text-lg gap-2'>Оформить заказ<ArrowRight size={20}/></p>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}