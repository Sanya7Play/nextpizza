import {Clock, Trash2} from "lucide-react";
import PurchaseCard from "@/components/shared/PurchaseCard";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";

export default function FilingData() {
	return (
		<div className='flex flex-col gap-10'>
			<div className='flex flex-col w-auto h-auto bg-neutral-50 rounded-xl gap-3'>
				<header className='flex flex-row justify-between w-auto border-b border-neutral-200 pb-5 p-8'>
					<h1 className='font-bold text-2xl'>1. Корзина</h1>
					<p className='flex flex-row items-center gap-1 text-base text-muted-foreground'><Trash2 size={16}/>Очистить корзину</p>
				</header>
				<PurchaseCard/>
				<PurchaseCard/>
				<PurchaseCard/>
			</div>
			<div className='flex flex-col w-auto h-auto bg-neutral-50 rounded-xl gap-3'>
				<header className='flex flex-row w-auto border-b border-neutral-300 pb-5 p-8'>
					<h1 className='font-bold text-2xl'>2. Персональные данные</h1>
				</header>
				<div className='grid grid-cols-2 gap-8 p-8'>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Имя</Label>
						<Input type='text' placeholder='Имя' className='h-11'/>
					</div>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Фамилия</Label>
						<Input type='text' placeholder='Фамилия' className='h-11'/>
					</div>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>E-mail</Label>
						<Input type='email' placeholder='E-mail' className='h-11'/>
					</div>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Телефон</Label>
						<Input type='tel' placeholder='' className='h-11'/>
					</div>
				</div>
			</div>
			<div className='flex flex-col w-auto h-auto bg-neutral-50 rounded-xl gap-3'>
				<header className='flex flex-row w-auto border-b border-neutral-300 pb-5 p-8'>
					<h1 className='font-bold text-2xl'>3. Адрес доставки</h1>
				</header>
				<div className='flex flex-col gap-8 pt-8 pb-2 px-8'>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Введите адрес</Label>
						<Input type='text' placeholder='Адрес' className='h-11'/>
					</div>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Комментарий к заказу</Label>
						<Textarea placeholder="Укажите дополнительную информацию для курьера" className='min-h-30'/>
					</div>
				</div>
				<div className='flex flex-col px-8 py-4 gap-2'>
					<p>Время доставки</p>
					<span className='flex flex-row gap-2'><Clock/>Доставка в 11:00</span>
				</div>
			</div>
		</div>
	)
}