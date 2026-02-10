'use client'
import {Button} from "@/components/ui/button";
import {Ingredient} from "@/generated/prisma/client";
import {IProduct, IItem, buttonDrink} from "@/components/constants/pizza";
import {useEffect, useState} from "react";
import SkeletonId from "@/components/shared/SkeletonId";
import IngredientsCard from "@/components/shared/IngredientsCard";
import {buttonDaugh, buttonSize} from "@/components/constants/pizza";
import {useCartStore} from "@/components/store/cart";
import {Loader} from "lucide-react";
import {useProviders} from "@/components/shared/context/CategoryFilter";

type Props = {
	product: IProduct | null;
	ingredients?: Ingredient[] | [];
	description?: string;
	category: string;
}

export default function WindowCardItem({product, ingredients, description, category}:Props){

	const addItem = useCartStore(state => state.addItem);
	const [loading, setLoading] = useState<boolean>(false);
	const [size, setSize] = useState<string | undefined>(buttonSize[0]?.size);
	const [key, setKey] = useState<number | undefined>(buttonSize[0]?.key);
	const [weight, setWeight] = useState<number | undefined>(buttonSize[0]?.weight);
	const [sizeDrink, setSizeDrink] = useState<number | undefined>(buttonDrink[0]?.key);
	const [daugh, setDaugh] = useState<string | undefined>(buttonDaugh[0]);
	const [supplements, setSupplements] = useState<Ingredient[]>([]);
	const {loadingButton, setLoadingButton} = useProviders()

	const basePrice = product?.price ?? 0;
	const delta = buttonSize.find((s) => s.key === key)?.price ?? 0;
	const supplementsTotal = supplements.reduce((sum, i) => sum + i.price, 0);
	const totalPrice = basePrice + delta + supplementsTotal;

	const changeSize = (item: IItem) => {
		setKey(item.key);
		setSize(item.size);
		setWeight(item.weight);
		setSizeDrink(item.key)
	}

	const changeType = (item: string | undefined) => {
		setDaugh(item);
	}

	const addIngredient = (id: number) => {
		const supplement: boolean = supplements.some(item => item.id === id);
		if(supplement){
			setSupplements(prev => prev.filter(item => item.id !== id));
		}
		else{
			const toAdd = ingredients?.find(item => item.id === id);
			if (!toAdd) return;
			setSupplements(prev => [...prev, toAdd]);
		}

	}

	const handleAddToDrawer = async () => {
		setLoadingButton(true);
		try {
			if(!product || !size || !daugh || !key || !weight) return
			const filteredSupplement = supplements.map(i => i.name)
			const itemKey = `${product.id}_${key}_${daugh}_${filteredSupplement}`;
			const cartItem = {
				id: product.id,
				key: itemKey,
				productId: product.id,
				name: product.name,
				imageUrl: product.imageUrl,
				unitPrice: totalPrice,
				size,
				dough: daugh,
				weight,
				ingredients: supplements,
				sizeNumber: key,
			}
			addItem(cartItem);
		}
		catch (err) {

		}
		finally {
			setLoadingButton(false);
		}
	}

	useEffect(() => {
		async function getProduct(){
			if(product){
				setLoading(true);
				setTimeout(() => {
					setLoading(false);
				}, 500);
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
						<img src={product?.imageUrl} alt={product?.name} width={500} height={500} />
					</div>
					<div className="flex flex-col gap-6 p-10 rounded-2xl">
						<div className="flex flex-col gap-3">
							<h1 className='text-4xl font-extrabold'>{product?.name}</h1>
							{category === 'Пиццы' ? (
								<>
									<p className='text-sm font-normal text-muted-foreground'>{key} см, {`${daugh} тесто`}, {weight} г</p>
								</>
							) : (
								<p className='text-sm font-normal text-muted-foreground'>{sizeDrink} л, {size} стакан, {weight} г</p>
							)}

							<p className='text-base font-medium w-[500px]'>
								{description}
							</p>
						</div>
						<div className="flex flex-col gap-3 w-full max-w-[440px]">
							{category === 'Пиццы' ? (
								<>
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
								</>
							) : (
								<>
									<div className='bg-gray-200 px-1 py-1 rounded-4xl cursor-pointer'>
										{buttonDrink.map((item, index) => (
											<Button
												key={index}
												variant='ghost'
												className={`px-8.5 py-2.5 w-1/2 rounded-4xl font-bold text-base text-black cursor-pointer hover:bg-neutral-50 ${item.key === sizeDrink && 'bg-white text-black shadow px-8.5 py-2.5 rounded-4xl'}`}
												onClick={() => changeSize(item)}
											>
												{item.size}
											</Button>
										))}
									</div>
								</>
							)
							}
						</div>
						{ingredients?.length !== 0 && (
							<>
								<div className="flex flex-col gap-3 w-full max-w-[440px]">
									<h1 className='text-lg font-semibold'>Добавить по вкусу</h1>
									<div className='grid grid-cols-3 gap-5 bg-gray-200 p-3 rounded-2xl overflow-y-scroll h-[230px]'>
										{ingredients?.map((item: Ingredient) => (
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
							</>
						)}
						<div className="pt-2">
							{loadingButton ? (
								<Button
									className='w-full max-w-[440px] rounded-2xl py-6 text-base font-semibold cursor-pointer'
									disabled
								>
									<p className='animate-spin'>
										<Loader/>
									</p>
								</Button>
							):(<Button
								className={'w-full max-w-[440px] rounded-2xl py-6 text-base font-semibold cursor-pointer'}
								onClick={handleAddToDrawer}
							>
								Добавить в корзину за {totalPrice} ₽
							</Button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>

	)
}