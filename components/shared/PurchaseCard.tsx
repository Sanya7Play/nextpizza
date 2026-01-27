import Image from "next/image";
import {Minus, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Ingredient} from "@/generated/prisma/client";

interface PurchaseCardProps {
	id: number;
	keyItem: string;
	name: string;
	image: string;
	weight: number;
	quantity: number;
	ingredients: Ingredient[];
	sizeNumber: number;
	price: number;
	daugh: string;
	addQuantity(keyItem: string): void;
	deleteQuantity(keyItem: string): void;
}
export default function PurchaseCard(
	{
		keyItem,
		name,
		image,
		weight,
		price,
		daugh,
		quantity,
		ingredients,
		sizeNumber,
		addQuantity,
		deleteQuantity
}:PurchaseCardProps) {
	const ingredientsNames = ingredients.map((ingredient) => ingredient.name).join(', ');

	const handleDeleteQuantity = () => {
		deleteQuantity(keyItem)
	}
	const handleAddQuantity = ()	 => {
		addQuantity(keyItem)
	}
	return(
		<div className="flex items-center justify-between mx-8 my-5 border-b border-neutral-200 pb-5 last:border-none">
			<div className="flex items-center mr-10">
				<Image src={image} alt={name} width={60} height={60} />

				<div className="flex flex-col ml-5 max-w-[180px]">
					<span className="text-lg font-bold">{name}</span>
					<span className="text-sm text-muted-foreground">
						{daugh} тесто, {sizeNumber} см, {weight} г.
      				</span>
					<span className="text-sm text-muted-foreground">
        				Добавки: {ingredientsNames}
      				</span>
				</div>
			</div>

			<div className="flex items-center gap-10">
				{/* Цена */}
				<span className="font-bold whitespace-nowrap">
      				{price * quantity} ₽
    			</span>

				{/* Счётчик */}
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						size="sm"
						className="py-0.5 px-2"
						onClick={handleDeleteQuantity}
					>
						<Minus size={17} />
					</Button>

					<span className="font-bold w-4 text-center">
        				{quantity}
      				</span>

					<Button
						variant="outline"
						size="sm"
						className="py-0.5 px-2"
						onClick={handleAddQuantity}
					>
						<Plus size={17} />
					</Button>
				</div>
			</div>
		</div>
	)
}