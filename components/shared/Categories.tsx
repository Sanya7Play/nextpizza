import Link from "next/link";

const categories: string[] = ["Пицца", 'Комбо', 'Закуски', 'Коктейли', 'Кофе', 'Напитки', 'Десерты', 'Соусы'];
const activeIndex = 2;

export default function Categories() {

	return (
		<div className='flex flex-row items-center justify-around w-200 py-2 bg-neutral-100 rounded-2xl gap-4 my-5'>
			{categories.map((category, index) => (
				<Link
					key={category}
					className={`text-card-foreground font-bold  ${activeIndex === index && 'text-primary shadow bg-white px-4.5 py-2.5 rounded-2xl'} last:mr-3`}
					href="">
					{category}
				</Link>
			))}
		</div>
	)
}