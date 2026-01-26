
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
	 }
 ]
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
 export interface ICartItem {
	 id: number;
	 image: string;
	 name: string;
	 price: number;
	 size: string;
	 daugh: string;
	 weight: number;
	 key: number;
	 quantity: number;
	 ingredients: Ingredient[];
 }
export interface Ingredient {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
}
