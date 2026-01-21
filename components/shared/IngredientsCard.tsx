import {CircleCheck, RussianRuble} from "lucide-react";
import {Ingredient} from "@/generated/prisma/client";
interface IngredientsCard {
	id: number;
	name: string;
	price: number;
	image: string;
	changeIngredient: (id: number) => void;
	supplements: Ingredient[]
}

export default function IngredientsCard({id, name, price, image, changeIngredient, supplements}: IngredientsCard) {

	const handleIngredient = (id: number) => {
		changeIngredient(id)
	}

	const ingredient: Ingredient | undefined = supplements.find(ingredient => ingredient.id === id);

	return (
		<div
			className={`bg-white flex flex-col items-center rounded-2xl cursor-pointer gap-3 px-3 py-3 shadow-lg ${ingredient?.id === id  ? 'border-2 border-primary' : 'border-2 border-gray-100' }`}
			key={id}
			onClick={() => handleIngredient(id)}
		>
			<div className="relative">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={image} alt={name} width={110} height={110} />
				<div className="absolute right-0 top-0">
					{ingredient?.id === id ? (<CircleCheck color='#f54900' size={22}/>) : ('') }
				</div>
			</div>

			<p className='text-xs font-medium'>{name}</p>
			<span className='text-sm flex flex-row items-center font-semibold'>{price} ₽</span>
		</div>
	)
}