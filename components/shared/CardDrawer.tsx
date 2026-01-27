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

export default function CardDrawer({children}: { children: React.ReactNode}) {

	const items = useCartStore(state => state.items);
	const removeItem = useCartStore(state => state.removeItem);
	const incrementCart = useCartStore(state => state.incrementCart);
	const decrementCart = useCartStore(state => state.decrementCart);

	const totalCount = useCartStore(state => state.totalCount);
	const totalPrice = useCartStore(state => state.totalPrice);
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
						<div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-scroll scrollbar-hide">
							{items.map((item) => (
								<CartItem
									key={item.key}
									keyItem={item.key}
									id={item.id}
									name={item.name}
									image={item.imageUrl}
									price={item.unitPrice}
									size={item.size}
									daugh={item.dough}
									quantity={item.quantity}
									weight={item.weight}
									ingredients={item.ingredients}
									sizeNumber={item.sizeNumber}
									deleteItem={removeItem}
									addToCart={incrementCart}
									deleteQuantity={decrementCart}
								/>
							))}
						</div>
						<SheetFooter>
							<div className='flex flex-row text-lg font-bold px-2 py-1 gap-1'>
								<span className='text-lg'>
									Итого
								</span>
								<span className='flex-1 border-b border-dashed border-gray-400 w-full p-0 my-2 mx-2'></span>
								<span className='flex flex-row items-center'>{totalPrice} ₽</span>
							</div>
							<Link href='/drawer' className='flex justify-between'>
								<Button
									type="submit"
									variant='default'
									className='text-base font-bold py-6 w-full mx-auto rounded-xl gap-1 cursor-pointer group'>
									Оформить заказ
									<ArrowRight className='group-hover:translate-x-2 duration-300' size={21}/>
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