import {Ingredients} from ".prisma/client";

 export const categories: string[] = ["Все", "Пицца", 'Комбо', 'Закуски', 'Коктейли', 'Кофе', 'Напитки', 'Десерты', 'Соусы'];
 export const buttonDaugh = ['Традиционное','Тонкое'];
 export const buttonSize = [
	 {
		 key: 25,
		 weight: 250,
		 size: 'Маленькая',
	 },
	 {
		 key: 30,
		 weight: 380,
		 size: 'Средняя',
	 },
	 {
		 key: 40,
		 weight: 560,
		 size: 'Большая',
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
 }
 export interface ICartItem {
	 id: number;
	 name: string;
	 price: number;
	 size: string | undefined;
	 daugh: string | undefined;
	 ingredients: Ingredients[];
 }
