import Image from "next/image";
import {Button} from "@/components/ui/button";
import Ingredients from "@/components/shared/Ingredients";


export default function WindowCardItem(){
	const size = 'Маленькая';
	const daugh = 'Традиционное';
	const buttonSize = ['Маленькая','Средняя','Большая'];
	const count = ['Традиционное','Тонкое'];
	return (
		<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
			<div className="p-10 rounded-2xl w=[570] h=[570] flex items-center justify-center gap-5">
				<Image src='/img2.png' alt='ProductImage' width={500} height={500} />
			</div>
			<div className="flex flex-col gap-6 p-10 rounded-2xl">
				<div className="flex flex-col gap-3">
					<h1 className='text-4xl font-extrabold'>Чизбургер-пицца</h1>
					<p className='text-sm font-normal text-muted-foreground'>25 см, традиционное тесто 25, 380 г</p>
				</div>
				<div className="flex flex-col gap-3 w-full max-w-[440px]">
					<div className='bg-gray-200 px-1 py-1 rounded-4xl cursor-pointer'>
						{buttonSize.map((item, index) => (
							<Button
								key={index}
								variant='ghost'
								className={`px-8.5 py-2.5 rounded-4xl font-bold text-base text-black cursor-pointer ${item === size && 'bg-white text-black shadow px-8.5 py-2.5 rounded-4xl'}`}
							>
								{item}
							</Button>
						))}
					</div>
					<div className='bg-gray-200 px-1 py-1 rounded-4xl cursor-pointer w-full'>
						{count.map((item, index) => (
							<Button
								key={index}
								variant='ghost'
								className={`px-8.5 py-2.5 w-1/2 rounded-4xl font-bold text-base text-black cursor-pointer ${item === daugh && 'bg-white text-black shadow px-8.5 py-2.5 rounded-4xl'}`}
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
						Добавить в корзину за 799₽
					</Button>
				</div>
			</div>
		</div>
	)
}