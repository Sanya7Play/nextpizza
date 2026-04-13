import Image from "next/image";
import {Ingredient} from "@/generated/prisma";
import {buttonDrink, categories} from "@/components/constants/pizza";
import {useState} from "react";

interface Props {
	id: number;
	price: number;
	quantity: number;
	name: string;
	image: string;
	supplements: Ingredient[];
	category: number;
	keyItem: string | null;
}
export default function OrderCard({id, price, quantity, name, supplements, image, category, keyItem}: Props) {
	const [size, setSize] = useState(keyItem?.split('_') || null);

	const categoryFind = categories.find((cat, index) => {
		if (index === category) return cat;
	});

	return (
		<div className='flex flex-row justify-between mx-5 my-4 border-b border-neutral-200 pb-5 last:border-none' key={id}>
			<div className='flex flex-row w-auto h-auto '>
				<Image src={image} alt='name' width={60} height={60} className='m-auto'/>
				<div className='flex flex-col ml-5'>
					<p className='text-lg font-bold'>{name}</p>
					{categoryFind === 'Напитки' || categoryFind === 'Кофе' ? (<>
						{keyItem?.split('_')[1] === '0.3' ? (<p className='text-sm text-muted-foreground '>Средний стакан {keyItem?.split('_')[1]} л.</p>) : (<p className='text-sm text-muted-foreground '>Большой стакан {keyItem?.split('_')[1]} л.</p>) }
					</>) : (
						<>
							<p className='text-sm text-muted-foreground'>{keyItem?.split('_')[2]} тесто, {keyItem?.split('_')[1]} см.</p>
							<p className='text-sm text-muted-foreground'>Добавки: {supplements.map(item => item.name).join(', ')}</p>
						</>
					)}

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