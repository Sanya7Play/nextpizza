'use client'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Ingredients from "@/components/shared/Ingredients";
import {Product} from ".prisma/client";
import {useEffect, useState} from "react";
import SkeletonId from "@/components/shared/SkeletonId";

type Props = {
	product: Product | null;
}

export default function WindowCardItem({product}:Props){

	const buttonSize = ['Маленькая', 'Cредняя', 'Большая'];
	const buttonDaugh = ['Традиционное','Тонкое'];

	const [loading, setLoading] = useState<boolean>(false);
	const [size, setSize] = useState<string | undefined >(buttonSize[0]);
	const [daugh, setDaugh] = useState<string | undefined >(buttonDaugh[0]);

	const changeSize = (item: string | undefined) => {
		const size: string | undefined = buttonSize.find(sizeItem => item === sizeItem);
		setSize(size)
	}

	const changeType = (item: string | undefined) => {
		const type: string | undefined = buttonDaugh.find(daugh => item === daugh);
		setDaugh(type)
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
						<Image src={product!.imageUrl} alt={product!.name} width={500} height={500} />
					</div>
					<div className="flex flex-col gap-6 p-10 rounded-2xl">
						<div className="flex flex-col gap-3">
							<h1 className='text-4xl font-extrabold'>{product?.name}</h1>
							<p className='text-sm font-normal text-muted-foreground'>25 см, традиционное тесто 25, 380 г</p>
						</div>
						<div className="flex flex-col gap-3 w-full max-w-[440px]">
							<div className='bg-gray-200 px-1 py-1 rounded-4xl cursor-pointer'>
								{buttonSize.map((item, index) => (
									<Button
										key={index}
										variant='ghost'
										className={`px-8.5 py-2.5 rounded-4xl font-bold text-base text-black cursor-pointer hover:bg-neutral-50 ${item === size && 'bg-white text-black shadow px-8.5 py-2.5 rounded-4xl'}`}
										onClick={() => changeSize(item)}
									>
										{item}
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
						<div className="flex flex-col gap-3">
							<h1 className='text-lg font-semibold'>Ингредиенты</h1>
							<div className='flex flex-row gap-5'>
								<Ingredients />
								<Ingredients />
								<Ingredients />
								<Ingredients />
							</div>
						</div>
						<div className="pt-2">
							<Button className="w-full max-w-[360px] rounded-2xl py-6 text-base font-semibold">
								Добавить в корзину за {product?.price} ₽
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>

	)
}