import {Button} from "@/components/ui/button";
import {Minus, Plus, RussianRuble, Trash2} from "lucide-react";
import {Ingredient} from ".prisma/client";
import {ICartItem} from "@/components/constants/pizza";
interface CartItemProps {
	id: number,
	sizeNumber: number,
	name: string,
	image: string,
	price: number,
	size: string | undefined,
	daugh: string | undefined,
	quantity: number,
	weight: number | undefined,
	ingredients: Ingredient[]
	deleteItem: (item: ICartItem) => void
	addToCart: (item: ICartItem) => void
	deleteQuantity: (item: ICartItem) => void
}
export default function CartItem(
	{
		id,
		name,
		image,
		weight,
		price,
		size,
		daugh,
		quantity,
		ingredients,
		sizeNumber,
		deleteItem,
		addToCart,
		deleteQuantity
	}: CartItemProps) {
	const ingredientsNames = ingredients.map((ingredient) => ingredient.name).join(', ');

	const handleDelete = () => {
		const key = sizeNumber;
		deleteItem({id, name, image, size, daugh, quantity, price, ingredients, key, weight})
	}
	const handleAdd = () => {
		const key = sizeNumber;
		addToCart({id, name, image, size, daugh, quantity, price, ingredients, key, weight})
	}
	const handleQuantity = () => {
		const key = sizeNumber;
		deleteQuantity({id, name, image, size, daugh, quantity, price, ingredients, key, weight})
	}

	return(
		<div className='flex flex-row gap-5 py-5 rounded-2xl' key={id}>
			<div className='flex flex-col items-center justify-center'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={image} alt={name} width={85} height={85}/>
			</div>
			<div className='flex flex-col w-full'>
				<div className='flex flex-col mb-3 border-b pb-3'>
					<h1 className='text-base font-bold'>
						{name}
					</h1>
					<p className='text-sm text-muted-foreground'>
						{size} {sizeNumber} см, {daugh} тесто, {weight} г.
					</p>
					<p className='text-sm text-muted-foreground'>
						{ingredientsNames}
					</p>
				</div>
				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-row items-center gap-3'>
						{quantity === 1 ? (
							<Button variant='outline' size='sm' className='py-0.5 px-2 cursor-pointer' disabled onClick={handleQuantity}>
								<Minus size={17}/>
							</Button>
						) : (
							<Button variant='outline' size='sm' className='py-0.5 px-2 cursor-pointer' onClick={handleQuantity}>
								<Minus size={17}/>
							</Button>
						)}

						<p className='font-bold'>{quantity}</p>
						<Button variant='outline' size='sm' className='py-0.5 px-2 cursor-pointer' onClick={handleAdd}>
							<Plus size={17}/>
						</Button>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<span className='flex flex-row items-center text-base font-bold gap-0.5'>{price} ₽</span>
						<Trash2 color='grey' strokeWidth={2} size={16} className='cursor-pointer' onClick={handleDelete}/>
					</div>
				</div>
			</div>
		</div>
	)
}