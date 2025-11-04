import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {RussianRuble} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {Label} from "@/components/ui/label";

export default function Filters() {
	return(
		<div className='flex flex-col gap-5 mx-20 my-1 w-60'>
			<div className='flex flex-col gap-5 w-60 border-b border-gray-200 pb-6'>
				<h1 className='font-bold text-2xl '>Фильтрация</h1>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='made' className='cursor-pointer'/>
					<Label htmlFor="made" className='text-base'>Можно собирать</Label>
				</div>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='new' className='cursor-pointer'/>
					<Label htmlFor="new" className='text-base'>Новинки</Label>
				</div>
			</div>
			<div className='flex flex-col gap-3 border-b border-gray-200 pb-6'>
				<h1 className='font-bold text-lg'>Цена от и до:</h1>
				<div className='flex flex-row items-center gap-4 my-3'>
					<p className='relative'>
						<RussianRuble className='absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground'/>
						<Input type='text' placeholder='0' className='w-25 h-10' />
					</p>
					<p className='relative'>
						<RussianRuble className='absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground'/>
						<Input type='text' placeholder='1950' className='w-25 h-10'/>
					</p>
				</div>
				<Slider defaultValue={[0, 1950]} min={0} max={1950} step={1}/>
			</div>
			<div className='flex flex-col gap-3'>
				<h1 className='font-bold text-lg'>Ингредиенты: </h1>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='cheesy' className='cursor-pointer'/>
					<Label htmlFor="cheesy" className='text-base'>Сырный соус</Label>
				</div>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='mozzarella' className='cursor-pointer'/>
					<Label htmlFor="mozzarella" className='text-base'>Моцарелла</Label>
				</div>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='tomate' className='cursor-pointer'/>
					<Label htmlFor="tomate" className='text-base'>Томаты</Label>
				</div>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='garlic' className='cursor-pointer'/>
					<Label htmlFor="garlic" className='text-base'>Чеснок</Label>
				</div>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='cucumbers' className='cursor-pointer'/>
					<Label htmlFor="cucumbers" className='text-base'>Соленные огурчики</Label>
				</div>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='onion' className='cursor-pointer'/>
					<Label htmlFor="onion" className='text-base'>Красный лук</Label>
				</div>
				<div>
					<button className='text-primary cursor-pointer'>+ Показать все</button>
				</div>
			</div>
			<div className='flex flex-col gap-3 pb-2'>
				<h1 className='font-bold text-lg'>Тип теста: </h1>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='thin' className='cursor-pointer'/>
					<Label htmlFor="thin" className='text-base'>тонкое</Label>
				</div>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox id='traditional' className='cursor-pointer'/>
					<Label htmlFor="traditional" className='text-base'>традиционное</Label>
				</div>
			</div>
			<div className='pt-2 pb-10'>
				<Button className='rounded-4xl py-6 w-full cursor-pointer'>Применить</Button>
			</div>
		</div>
	)
}