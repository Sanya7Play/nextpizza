'use client'
import {
	Sheet, SheetClose,
	SheetContent, SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CartItem from "@/components/shared/CartItem";
import {useCartStore} from "@/components/store/cart";
import {ICartItem} from "@/components/constants/pizza";

export default function CardDrawer({children}: { children: React.ReactNode}) {

	const items = useCartStore(state => state.items);
	const addItem = useCartStore(state => state.addItem);
	const removeItem = useCartStore(state => state.removeItem);
	const removeQuantity = useCartStore(state => state.removeQuantity);

	const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
	const totalPrice = items.reduce((sum, i) => sum + i.price, 0);
	console.log(items);
	return (
		<>
			{items.length > 0 ? (
				<Sheet>
					<SheetTrigger asChild>{children}</SheetTrigger>
					<SheetContent showClose={true}>
						<SheetHeader className="text-card-foreground flex flex-row items-center justify-between">
							<SheetTitle className='flex flex-row gap-1'>
								<p className='text-xl'>В корзине</p>
								<p className='text-xl font-extrabold'>
									{totalCount} товара
								</p>
							</SheetTitle>
							<SheetDescription></SheetDescription>
						</SheetHeader>
						<div className="grid flex-1 auto-rows-min gap-6 px-4">
							{items.map((item: ICartItem, index: number) => (
								<CartItem
									key={item.id}
									sizeNumber={item.key}
									weight={item.weight}
									id={index + 1}
									price={item.price}
									name={item.name}
									image={item.image}
									size={item.size}
									daugh={item.daugh}
									quantity={item.quantity}
									ingredients={item.ingredients}
									deleteItem={removeItem}
									addToCart={addItem}
									deleteQuantity={removeQuantity}
								/>
							))}
						</div>
						<SheetFooter>
							<div className='flex flex-row text-lg font-bold px-2 py-1 gap-2'>
								<p className='text-lg'>
									Итого
								</p>
								<p className='border-b border-dashed border-gray-400 w-full p-0 my-2 mx-1'></p>
								<p className='flex flex-row items-center gap-0.5'>{totalPrice}₽</p>
							</div>
							<Link href='/drawer'>
								<Button
									type="submit"
									variant='default'
									className='text-base font-bold py-6 w-11/12 mx-auto rounded-xl gap-1 cursor-pointer'>
									Оформить заказ
									<ArrowRight size={20}/>
								</Button>
							</Link>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			) : (
				<Sheet>
					<SheetTrigger asChild>{children}</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle></SheetTitle>
						</SheetHeader>
						<div className='flex flex-col items-center justify-center w-full h-full gap-3'>
							<Image src='/cart.png' alt='Image' width={120} height={120} />
							<div className='flex flex-col items-center justify-center gap-2'>
								<h1 className='text-[22px] font-bold'>Корзина пустая</h1>
								<p className='text-center w-3/4 text-base text-muted-foreground'>Добавьте хотя бы одну пиццу, чтобы совершить заказ</p>
							</div>
							<SheetClose asChild>
								<Button variant="default"
										className='gap-2 cursor-pointer font-bold py-6 px-6 rounded-2xl'
								>
									<ArrowLeft size={20}/>
									Вернуться назад
								</Button>
							</SheetClose>
						</div>
						<SheetFooter>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			)
			}
		</>

	)
}