'use client'
import {Button} from "@/components/ui/button";
import {Ingredient} from "@/generated/prisma/client";
import {ICartItem, IProduct, IItem} from "@/components/constants/pizza";
import {useEffect, useState} from "react";
import SkeletonId from "@/components/shared/SkeletonId";
import IngredientsCard from "@/components/shared/IngredientsCard";
import {buttonDaugh, buttonSize} from "@/components/constants/pizza";
import {useCartStore} from "@/components/store/cart";

type Props = {
	product: IProduct | null;
	ingredients: Ingredient[] | [];
}

export default function WindowCardItem({product, ingredients}:Props){

	const addItem = useCartStore(state => state.addItem);
	const [loading, setLoading] = useState<boolean>(false);
	const [size, setSize] = useState<string | undefined>(buttonSize[0].size);
	const [key, setKey] = useState<number | undefined>(buttonSize[0].key);
	const [weight, setWeight] = useState<number | undefined>(buttonSize[0].weight);
	const [daugh, setDaugh] = useState<string | undefined>(buttonDaugh[0]);
	const [supplements, setSupplements] = useState<Ingredient[]>([]);

	const changeSize = (item: IItem) => {
		const size: string | undefined = buttonSize.find(obj => item.size === obj.size)?.size;
		const key: number | undefined = buttonSize.find(obj => item.key === obj.key)?.key;
		const weight: number | undefined = buttonSize.find(obj => item.weight === obj.weight)?.weight;
		setKey(key);
		setSize(size);
		setWeight(weight);
	}

	const changeType = (item: string | undefined) => {
		const type: string | undefined = buttonDaugh.find(daugh => item === daugh);
		setDaugh(type);
	}

	const addIngredient = (id: number) => {
		const supplement: boolean = supplements.some(item => item.id === id);
		if(supplement){
			setSupplements(prev => prev.filter(item => item.id !== id));
		}
		else{
			const toAdd = ingredients.find(item => item.id === id);
			if (!toAdd) return;
			setSupplements(prev => [...prev, toAdd]);
		}
	}

	 const handleAddToDrawer = () => {
		const totalPrice = ingredients.reduce((sum, i) => sum + i.price, 0);
		const addCartItem: ICartItem = {
			id: product!.id,
			name: product!.name,
			price: product!.price + totalPrice,
			quantity: 1,
			ingredients: supplements,
			image: product!.imageUrl,
			size: size!,
			daugh: daugh!,
			weight: weight!,
			key: key!
		}
		if (!addCartItem) return;
		addItem(addCartItem)
		console.log(addCartItem);
	}

	useEffect(() => {
		async function getProduct(){
			if(product){
				setLoading(true);
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
			else{
				setLoading(false);
			}
		}
		getProduct()
	},[product])
	return (
		<div>
			{loading ? (<SkeletonId/>) : (
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5" key={product?.id}>
					<div className="p-10 rounded-2xl w=[570] h=[570] flex items-center justify-center gap-5">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={product!.imageUrl} alt={product!.name} width={500} height={500} />
					</div>
					<div className="flex flex-col gap-6 p-10 rounded-2xl">
						<div className="flex flex-col gap-3">
							<h1 className='text-4xl font-extrabold'>{product?.name}</h1>
							<p className='text-sm font-normal text-muted-foreground'>{key} см, {daugh} тесто, {weight} г</p>
						</div>
						<div className="flex flex-col gap-3 w-full max-w-[440px]">
							<div className='bg-gray-200 px-1 py-1 rounded-4xl cursor-pointer'>
								{buttonSize.map((item, index) => (
									<Button
										key={index}
										variant='ghost'
										className={`px-8.5 py-2.5 rounded-4xl font-bold text-base text-black cursor-pointer hover:bg-neutral-50 ${item.size === size && 'bg-white text-black shadow px-8.5 py-2.5 rounded-4xl'}`}
										onClick={() => changeSize(item)}
									>
										{item.size}
									</Button>
								))}
							</div>
							<div className='bg-gray-200 px-1 py-1 rounded-4xl cursor-pointer w-full'>
								{buttonDaugh.map((item, index) => (
									<Button
										key={index}
										variant='ghost'
										className={`px-8.5 py-2.5 w-1/2 rounded-4xl font-bold text-base text-black cursor-pointer ${item === daugh && 'bg-white text-black shadow px-8.5 py-2.5 rounded-4xl'}`}
										onClick={() => changeType(item)}
									>
										{item}
									</Button>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-3 w-full max-w-[440px]">
							<h1 className='text-lg font-semibold'>Ингредиенты</h1>
							<div className='grid grid-cols-3 gap-5 bg-gray-200 p-3 rounded-2xl overflow-y-scroll h-[200px]'>
								{ingredients.map((item: Ingredient) => (
									<IngredientsCard
										key={item.id}
										id={item.id}
										name={item.name}
										price={item.price}
										image={item.imageUrl}
										changeIngredient={addIngredient}
										supplements={supplements}
									/>
								))}
							</div>
						</div>
						<div className="pt-2">
							<Button
								className="w-full max-w-[440px] rounded-2xl py-6 text-base font-semibold cursor-pointer"
								onClick={handleAddToDrawer}
							>
								Добавить в корзину за {product?.price} ₽
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>

	)
}