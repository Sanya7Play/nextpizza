'use client'
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {Label} from "@/components/ui/label";
import {useEffect, useState} from "react";
import axios from "axios";
import {Ingredient} from "@/generated/prisma";
import {buttonDaugh} from "@/components/constants/pizza";
import {useProviders} from "@/components/shared/context/CategoryFilter";

export default function Filters() {
	const { loading, setLoading} = useProviders();
	const [value, setValue] = useState<number[]>([0, 4950]);
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [showAll, setShowAll] = useState(false);
	const [checked, setChecked] = useState<string[]>([]);
	const [daugh, setDaugh] = useState<string[]>([]);
	useEffect(() => {
		async function getIngredients() {
			setLoading(true);
			try {
				const response = await axios.get('/api/ingredient',{
					params: { show: showAll}
				});
				setIngredients(response.data.map((ingredient: Ingredient) => ingredient.name));
			}
			catch (error) {
			}
			finally {
				setLoading(false);
			}
		}
		getIngredients();
	}, [showAll]);
	const handleChecked = (ingredient: string) => {
		setChecked(prev => {
			return prev.includes(ingredient) ? prev.filter(item => item !== ingredient) : [...prev, ingredient];
		});
	}
	const handleDaugh = (daugh: string) => {
		setDaugh(prev => {
			return prev.includes(daugh) ? prev.filter(item => item !== daugh) : [...prev, daugh];
		});
	}
	const showButton = () => {
		if (showAll){
			setShowAll(false);
			setIngredients([])
		}
		else{
			setShowAll(true);
			setIngredients([])
		}
	}
	const queryFunction = () => {

	}
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
						<span className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground'>₽</span>
						<Input value={value[0]} type='number' placeholder='0' className='w-25 h-10' onChange={(e) =>
							setValue([
								Math.min(Number(e.target.value), value[1]),
								value[1],
							])
						}/>
					</p>
					<p className='relative'>
						<span className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground'>₽</span>
						<Input value={value[1]} type='number' placeholder='1950' className='w-25 h-10' onChange={(e) =>
							setValue([
								value[0],
								Math.max(Number(e.target.value), value[0]),
							])
						} />
					</p>
				</div>
				<Slider className='cursor-pointer' defaultValue={value} onValueChange={setValue} min={0} max={4950} step={50}/>
			</div>
			<div className='flex flex-col gap-3'>
				<h1 className='font-bold text-lg'>Ингредиенты: </h1>
				{
					ingredients.map((ingredient, index) => (
						<div className='flex flex-row items-center gap-3' key={index}>
							<Checkbox value={ingredient} className='cursor-pointer' onClick={() => handleChecked(ingredient)}/>
							<Label htmlFor={ingredient} className='text-base'>{ingredient}</Label>
						</div>
					))
				}
				<div>
					<button className='text-primary cursor-pointer' onClick={() => showButton()}>{showAll ? ' Cкрыть' : '+ Показать все'}</button>
				</div>
			</div>
			<div className='flex flex-col gap-3 pb-2'>
				<h1 className='font-bold text-lg'>Тип теста: </h1>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox value={buttonDaugh[1]} className='cursor-pointer' onClick={() => handleDaugh(buttonDaugh[1])}/>
					<Label htmlFor="thin" className='text-base'>{buttonDaugh[1].toLowerCase()}</Label>
				</div>
				<div className='flex flex-row items-center gap-3'>
					<Checkbox value={buttonDaugh[1]} className='cursor-pointer' onClick={() => handleDaugh(buttonDaugh[0])}/>
					<Label htmlFor="traditional" className='text-base'>{buttonDaugh[0].toLowerCase()}</Label>
				</div>
			</div>
			<div className='pt-2 pb-10'>
				<Button className='rounded-4xl py-6 w-full cursor-pointer' onClick={() => queryFunction()}>Применить</Button>
			</div>
		</div>
	)
}