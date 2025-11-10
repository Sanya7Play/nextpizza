import Image from "next/image";
import {RussianRuble} from "lucide-react";

export default function OrderCard() {
	return (
		<div className='flex flex-row justify-between mx-5 my-4 border-b border-neutral-200 pb-5 last:border-none'>
			<div className='flex flex-row w-auto h-auto '>
				<Image src='/img2.png' alt='name' width={60} height={60} className='m-auto'/>
				<div className='flex flex-col ml-5'>
					<p className='text-lg font-bold'>Чизбургер-Пицца</p>
					<p className='text-sm text-muted-foreground'>Традиционное тесто, 20 см.</p>
				</div>
			</div>
			<div className='flex flex-row items-center ml-20 gap-2'>
				<div className='flex flex-col items-center'>
					<p className='flex flex-row items-center gap-0.5 text-base font-bold'>495<RussianRuble size={14} strokeWidth={3}/></p>
					<p className='text-muted-foreground'>2 шт.</p>
				</div>
			</div>
		</div>
	)
}