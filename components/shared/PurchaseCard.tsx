import Image from "next/image";
import {Minus, Plus, RussianRuble} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function PurchaseCard() {
	return(
		<div className='flex flex-row justify-between mx-8 my-5 border-b border-neutral-200 pb-5 last:border-none'>
			<div className='flex flex-row w-auto h-auto '>
				<Image src='/img2.png' alt='name' width={60} height={60} className='m-auto'/>
				<div className='flex flex-col ml-5'>
					<p className='text-lg font-bold'>Чизбургер-Пицца</p>
					<p className='text-sm text-muted-foreground'>Традиционное тесто, 20 см.</p>
				</div>
			</div>
			<div className='flex flex-row items-center ml-20 gap-2'>
				<div className='flex flex-row items-center'>
					<p className='flex flex-row items-center gap-0.5 font-bold'>495<RussianRuble size={14} strokeWidth={3}/></p>
				</div>
				<div className='flex flex-row items-center gap-3 ml-20'>
					<Button variant='outline' size='sm' className='py-0.5 px-2 cursor-pointer'>
						<Minus size={17}/>
					</Button>
					<p className='font-bold'>2</p>
					<Button variant='outline' size='sm' className='py-0.5 px-2 cursor-pointer'>
						<Plus size={17}/>
					</Button>
				</div>
			</div>
		</div>
	)
}