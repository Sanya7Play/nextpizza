"use client"
import {ArrowDown, Clock, Trash2} from "lucide-react";
import PurchaseCard from "@/components/shared/PurchaseCard";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {useCartStore} from "@/components/store/cart";
import React from "react";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import Image from "next/image";
import PopoverTime from "@/components/shared/PopoverTime";

export default function FilingData() {

	const {user, setUser, error, setDelivery, timeDelivery} = useProviders();
	const {items, clearCart, incrementCart, removeItem, decrementCart} = useCartStore();
	return (
		<div className='flex flex-col gap-10'>
			<div className='flex flex-col w-auto h-auto bg-neutral-300/40 border rounded-xl gap-3'>
				<header className={items.length > 0 ? 'flex flex-row justify-between w-auto border-b border-neutral-200 pb-5 p-8' : 'flex flex-row justify-between w-auto border-neutral-200 pb-5 p-8'}>
					<h1 className='font-bold text-2xl'>1. Корзина</h1>
					<p className='flex flex-row items-center gap-1 text-base text-muted-foreground cursor-pointer hover:text-gray-400 ' onClick={clearCart}>
						<Trash2 size={16}/>Очистить корзину
					</p>
				</header>
				{items.length > 0 ? (<>
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
							size={item.size}
							category={item.category}
							addQuantity={incrementCart}
							decrementCart={decrementCart}
							deleteQuantity={removeItem}
						/>
					))}
				</>) : (
					<div className='flex flex-col items-center justify-center w-full h-full gap-3 p-5'>
						<Image src='/cart.png' alt='Image' width={120} height={120} />
						<div className='flex flex-col items-center justify-center gap-2'>
							<h1 className='text-[22px] font-bold'>Корзина пустая</h1>
							<p className='text-center w-3/4 text-base text-muted-foreground'>Добавьте хотя бы один товар, чтобы совершить заказ</p>
						</div>
					</div>
				)}
			</div>
			<div className='flex flex-col w-auto h-auto bg-neutral-300/40 border rounded-xl gap-3'>
				<header className='flex flex-row w-auto border-b border-neutral-300 pb-5 p-8'>
					<h1 className='font-bold text-2xl'>2. Персональные данные</h1>
				</header>
				<div className='grid grid-cols-2 gap-8 p-8'>
					<div className='flex flex-col gap-2'>
						<Label className='font-bold text-sm'>Имя пользователя</Label>
						<Input
							type='text'
							placeholder='Полное имя'
							className='h-11 focus-visible:border-ring'
							value={user?.fullName || ''}
							onChange={(e) => setUser({...user, fullName: e.target.value})}
						/>
						{error && <span className='text-red-600 text-sm px-1'>{error.filter(item => item.includes('имя'))}</span>}
					</div>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>E-mail</Label>
						<Input
							type='email'
							placeholder='E-mail'
							className='h-11 focus-visible:border-ring'
							value={user?.email || ''}
							onChange={(e) => setUser({...user, email: e.target.value})}
						/>
						{error && <span className='text-red-600 text-sm px-1'>{error.filter(item => item.includes('Email'))}</span>}
					</div>

					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Телефон</Label>
						<Input
							type='tel'
							placeholder='+7(777)-777-77-77'
							className='h-11 focus-visible:border-ring'
							value={user?.telephone || ''}
							onChange={(e) => setUser({...user, telephone: e.target.value})}
						/>
						{error && <span className='text-red-600 text-sm px-1'>{error.filter(item => item.includes('телефон'))}</span>}
					</div>
				</div>
			</div>
			<div className='flex flex-col w-auto h-auto bg-neutral-300/40 border rounded-xl gap-3'>
				<header className='flex flex-row w-auto border-b border-neutral-300 pb-5 p-8'>
					<h1 className='font-bold text-2xl'>3. Адрес доставки</h1>
				</header>
				<div className='flex flex-col gap-8 pt-8 pb-2 px-8'>
					<div className='flex flex-col gap-2 '>
						<Label className='font-bold text-sm'>Введите адрес</Label>
						<Input
							type='text'
							placeholder='Адрес'
							className='h-11 focus-visible:border-ring'
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
					<div className='flex flex-row items-center gap-2 bg-neutral-300/10 w-2/5 p-4.5 rounded-2xl'>
						<Clock/>
						<p className='font-bold'>Время доставки:</p>
						<PopoverTime>
							<span className='flex flex-row gap-2 cursor-pointer text-primary'>{timeDelivery}</span>
						</PopoverTime>
					</div>
				</div>
			</div>
		</div>
	)
}