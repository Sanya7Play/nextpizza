export const categories: string[] = ["Все", "Пиццы", 'Комбо', 'Закуски', 'Коктейли', 'Кофе', 'Напитки', 'Десерты', 'Соусы'];
export const buttonDaugh = ['Традиционное','Тонкое'];
export const buttonSize = [
	 {
		 key: 25,
		 weight: 250,
		 size: 'Маленькая',
		 price: 0
	 },
	 {
		 key: 30,
		 weight: 380,
		 size: 'Средняя',
		 price: 270
	 },
	 {
		 key: 40,
		 weight: 560,
		 size: 'Большая',
		 price: 430
	 },
]
export const buttonDrink = [
	{
		key: 0.3,
		weight: 300,
		size: 'Cредний',
		price: 0
	},
	{
		key: 0.6,
		weight: 490,
		size: 'Большой',
		price: 120
	},
]
export const sortArray = [
	{
		name: 'по умолчанию'
	},
	{
		name: 'популярное'
	},
	{
		name: 'по цене'
	},
	{
		name: 'по алфавиту'
	},
]
export const percent: number = 1.15;
export const deliveryPrice: number = 250;
export interface IProduct {
	 name: string;
	 price: number;
	 imageUrl: string;
	 imageAlt?: string;
	 id: number;
}
export interface IItem {
	 key: number;
	 size: string;
	 weight: number;
	 price: number;
}
export interface Ingredient {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
}
