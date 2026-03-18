import {Button} from "@/components/ui/button";
import Link from "next/link";
import ProductSkeleton from "@/components/shared/ProductSkeleton";
import {Ingredient} from "@/generated/prisma/client";
import DialogWindow from "@/components/shared/DialogWindow";

interface ProductItemProps {
	ingredients: Ingredient[] | [];
	name: string;
	price: number;
	image: string;
	imageAlt: string;
	id: number;
	loading: boolean;
	description: string;
	category: string;
}
export default function ProductItem({name, price, image, id, loading, ingredients, description, category}: ProductItemProps) {
	return(
		<>
			{loading ? (<ProductSkeleton/>) : (
				<div className='flex flex-col h-auto mt-3 py-5 px-8 mx-5 bg-neutral-300/10 rounded-2xl' key={id}>
					<Link href={`/product/${id}`}>
						<div className='relative flex items-center justify-center py-5 mb-4 bg-primary/10 border-0 rounded-2xl'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={image} alt={name} width={200} height={200}/>
							<div className="absolute bottom-2 left-2 perspective-[800px]">
								<div className="bg-primary/80 text-white font-bold text-sm px-4 py-1.5 rounded-2xl rotate-x-[10deg] -rotate-y-[15deg]">
									новинка
								</div>
							</div>
						</div>
					</Link>
					<div className='flex flex-col justify-between h-full'>
						<div>
							<h1 className='font-bold text-xl my-3'>{name}</h1>
							<p className='text-muted-foreground text-sm'>
								{description}
							</p>
						</div>
						<div className='flex flex-row items-center justify-between mt-5'>
						<span className='flex flex-row gap-1 items-center text-xl'> от
							<p className='font-bold text-xl'>{price} ₽ </p>
						</span>
							<DialogWindow
								name={name}
								price={price}
								imageUrl={image}
								id={id}
								loading={loading}
								ingredients={ingredients}
								category={category}
								description={description}
							>
								<Button
									type='button'
									variant='default'
									size={"sm"}
									className='cursor-pointer text-base'>

									+ Выбрать
								</Button>
							</DialogWindow>
						</div>
					</div>
				</div>
			)}
		</>
	)
}