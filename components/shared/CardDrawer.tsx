import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import { ArrowRight,RussianRuble } from "lucide-react";
import CartItem from "@/components/shared/CartItem";
import Link from "next/link";

export default function CardDrawer({children}: { children: React.ReactNode}) {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent>
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
	)
}