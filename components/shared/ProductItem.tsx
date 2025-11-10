import {RussianRuble} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import ProductSkeleton from "@/components/shared/ProductSkeleton";

interface ProductItemProps {
	name: string;
	price: number;
	image: string;
	imageAlt: string;
	id: number;
	loading: boolean;
}

export default function ProductItem({name, price, image, imageAlt, id, loading}: ProductItemProps) {
	return(
		<>
			{loading ? (<ProductSkeleton/>) : (
				<div className='flex flex-col h-auto mt-3 p-5 bg-neutral-200/20 rounded-2xl' key={id}>
					<Link href={`/product/${id}`}>
						<div className='flex justify-center pb-4'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={image} alt={imageAlt} width={200} height={200}/>
						</div>
					</Link>
					<div>
						<h1 className='font-bold text-xl my-3'>{name}</h1>
						<p className='text-muted-foreground text-sm'>Маринованные огурчики, свежие томаты, красный лук, сочные ананасы, итальянские травы, сладкий перец, кубики брынзы, митболы</p>
					</div>
					<div className='flex flex-row items-center justify-between mt-5'>
				<span className='flex flex-row gap-1 items-center text-xl'> от
					<p className='font-bold text-xl'>{price}</p>
					<RussianRuble color='black' strokeWidth={2.5} size={18}/>
				</span>
						<Button variant='default' size={"sm"} className='cursor-pointer text-base'>+ Выбрать</Button>
					</div>
				</div>
			)}
		</>
	)
}