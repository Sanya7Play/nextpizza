'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";


const categories: string[] = ["Пицца", 'Комбо', 'Закуски', 'Коктейли', 'Кофе', 'Напитки', 'Десерты', 'Соусы'];
export default function Categories() {
	const [categoryNumber, setCategory] = useState<number>(0);
	const changeCategory= (category: string) => {
		const findIndex: number = categories.indexOf(category);
		setCategory(findIndex);
	}
	return (
		<div className='flex flex-row items-center justify-around bg-neutral-100 w-auto p-2.5 rounded-2xl gap-4 my-5'>
			{categories.map((category, index) => (
				<Button
					key={category}
					variant='secondary'
					className={`bg-white px-4.5 py-2.5 rounded-2xl font-bold text-base text-black cursor-pointer ${index === categoryNumber && 'text-primary shadow px-4.5 py-2.5 rounded-2xl'}`}
					onClick={() => {changeCategory(category)}}
					>
					{category}
				</Button>
			))}
		</div>
	)
}