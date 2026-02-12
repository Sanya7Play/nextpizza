"use client"
import {Clock, Trash2} from "lucide-react";
import PurchaseCard from "@/components/shared/PurchaseCard";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {useCartStore} from "@/components/store/cart";
import {useState} from "react";
import {useProviders} from "@/components/shared/context/CategoryFilter";

export default function FilingData() {

	const {user, setUser} = useProviders();
	const [delivery, setDelivery] = useState<string | undefined>(user?.address + ' ' + user?.apartment || '');
	const items = useCartStore(state => state.items);
	const clearCart = useCartStore(state => state.clearCart);
	const incrementCart = useCartStore(state => state.incrementCart);
	const removeItem = useCartStore(state => state.removeItem);
	return (
		<div className='flex flex-col gap-10'>
			<div className='flex flex-col w-auto h-auto bg-neutral-300/20 rounded-xl gap-3'>
				<header className={items.length > 0 ? 'flex flex-row justify-between w-auto border-b border-neutral-200 pb-5 p-8' : 'flex flex-row justify-between w-auto border-neutral-200 pb-5 p-8'}>
					<h1 className='font-bold text-2xl'>1. Корзина</h1>
					<p className='flex flex-row items-center gap-1 text-base text-muted-foreground cursor-pointer hover:text-gray-400 ' onClick={clearCart}>
						<Trash2 size={16}/>Очистить корзину
					</p>
				</header>
				{items.map(item => (
					<PurchaseCard
						key={item.key}
						keyItem={item.key}
						id={item.id}
						name={item.name}
						image={item.imageUrl}
						price={item.unitPrice}
						daugh={item.dough}
						quantity={item.quantity}
						weight={item.weight}
						ingredients={item.ingredients}
						sizeNumber={item.sizeNumber}
						addQuantity={incrementCart}
						deleteQuantity={removeItem}
					/>
					))}
			</div>
			<div className='flex flex-col w-auto h-auto bg-neutral-300/20 rounded-xl gap-3'>
				<header className='flex flex-row w-auto border-b border-neutral-300 pb-5 p-8'>
					<h1 className='font-bold text-2xl'>2. Персональные данные</h1>
				</header>
				<div className='grid grid-cols-2 gap-8 p-8'>
					<div className='flex flex-col gap-2'>
						<Label className='font-bold text-sm'>Имя</Label>
						<Input
							type='text'
							placeholder='Имя'
							className='h-11'
							value={user?.fullName?.split(' ')[0] || ''}
							onChange={(e) => setUser({...user, fullName: e.target.value})}
						/>
					</div>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Фамилия</Label>
						<Input
							type='text'
							placeholder='Фамилия'
							className='h-11'
							value={user?.fullName?.split(' ')[1] || ''}
							onChange={(e) => setUser({...user, fullName: e.target.value})}
						/>
					</div>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>E-mail</Label>
						<Input
							type='email'
							placeholder='E-mail'
							className='h-11'
							value={user?.email || ''}
							onChange={(e) => setUser({...user, email: e.target.value})}
						/>
					</div>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Телефон</Label>
						<Input
							type='tel'
							placeholder='+7(777)-777-77-77'
							className='h-11'
							value={user?.telephone || ''}
							onChange={(e) => setUser({...user, telephone: e.target.value})}
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col w-auto h-auto bg-neutral-300/20 rounded-xl gap-3'>
				<header className='flex flex-row w-auto border-b border-neutral-300 pb-5 p-8'>
					<h1 className='font-bold text-2xl'>3. Адрес доставки</h1>
				</header>
				<div className='flex flex-col gap-8 pt-8 pb-2 px-8'>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Введите адрес</Label>
						<Input
							type='text'
							placeholder='Адрес'
							className='h-11'
							value={user?.address + ' ' + user?.apartment || ' '}
							onChange={(e) => setDelivery(e.target.value)}
						/>
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