'use client'
import Link from "next/link";
import {useState} from "react";


const categories: string[] = ["Пицца", 'Комбо', 'Закуски', 'Коктейли', 'Кофе', 'Напитки', 'Десерты', 'Соусы'];
export default function Categories() {
	const [categoryNumber, setCategory] = useState<number>(0);
	const changeCategory= (category: string) => {
		const findIndex: number = categories.indexOf(category);
		setCategory(findIndex);
	}
	return (
		<div className='flex flex-row items-center justify-around w-200 p-2.5 bg-neutral-100 rounded-2xl gap-4 my-5'>
			{categories.map((category, index) => (
				<Link
					key={category}
					className={`text-card-foreground font-bold ${index === categoryNumber && 'text-primary shadow bg-white px-4.5 py-2.5 rounded-2xl'} last:mr-3`}
					onClick={() => {changeCategory(category)}}
					href="#">
					{category}
				</Link>
			))}
		</div>
	)
}