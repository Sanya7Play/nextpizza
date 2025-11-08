"use client"
import {
	Sheet, SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight, RussianRuble} from "lucide-react";
import CartItem from "@/components/shared/CartItem";
import Link from "next/link";
import Image from "next/image";

export default function CardDrawer({children}: { children: React.ReactNode}) {
	const items = [];
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
									3 товара
								</p>
							</SheetTitle>
						</SheetHeader>
						<div className="grid flex-1 auto-rows-min gap-6 px-4">
							<CartItem/>
							<CartItem/>
							<CartItem/>
						</div>
						<SheetFooter>
							<div className='flex flex-row justify-between text-lg font-bold px-4 py-1'>
								<p className='text-lg'>
									Итого
								</p>
								<p className='border-b border-dashed border-gray-400 w-full p-0 m-3'></p>
								<p className='flex flex-row items-center gap-1'>
									1590
									<RussianRuble size={14} strokeWidth={3}/>
								</p>
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