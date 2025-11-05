import Image from "next/image";
import {RussianRuble} from "lucide-react";
import {Button} from "@/components/ui/button";


export default function ProductItem() {
	return(
		<div className='flex flex-col h-auto mt-5'>
			<Image src='/img2.png' alt='name' width={200} height={200} className='m-auto pb-4'/>
			<div>
				<h1 className='font-bold text-xl my-3'>Чизбургер-пицца</h1>
				<p className='text-muted-foreground text-sm'>Маринованные огурчики, свежие томаты, красный лук, сочные ананасы, итальянские травы, сладкий перец, кубики брынзы, митболы</p>
			</div>
			<div className='flex flex-row items-center justify-between mt-5'>
				<span className='flex flex-row gap-1 items-center text-xl'> от
					<p className='font-bold text-xl'>395</p>
					<RussianRuble color='black' strokeWidth={2.5} size={18}/>
				</span>
				<Button variant='outline' size={"sm"} className='cursor-pointer text-base'>+ Выбрать</Button>
			</div>
		</div>
	)
}