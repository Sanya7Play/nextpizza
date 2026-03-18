import Image from "next/image";
import {Ingredient} from "@/generated/prisma";
import {categories} from "@/components/constants/pizza";

interface Props {
	id: number;
	price: number;
	quantity: number;
	name: string;
	image: string;
	supplements: Ingredient[];
	category: number;
}
export default function OrderCard({id, price, quantity, name, supplements, image, category}: Props) {
	const categoryFind = categories.filter((cat, index) => {
		if (index === category) return cat;
	});
	console.log();
	return (
		<div className='flex flex-row justify-between mx-5 my-4 border-b border-neutral-200 pb-5 last:border-none' key={id}>
			<div className='flex flex-row w-auto h-auto '>
				<Image src={image} alt='name' width={60} height={60} className='m-auto'/>
				<div className='flex flex-col ml-5'>
					<p className='text-lg font-bold'>{name}</p>
					<p className='text-sm text-muted-foreground'>Традиционное тесто, 20 см.</p>
					<p className='text-sm text-muted-foreground'>Добавки: {supplements.map(item => item.name).join(', ')}</p>
				</div>
			</div>
			<div className='flex flex-row items-center ml-20 gap-2'>
				<div className='flex flex-col items-center'>
					<p className='flex flex-row items-center gap-0.5 text-base font-bold'>{price * quantity} ₽</p>
					<p className='text-muted-foreground'>{quantity} шт.</p>
				</div>
			</div>
		</div>
	)
}