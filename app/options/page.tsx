import Header from "@/components/shared/Header";
import Title from "@/components/shared/Title";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function Options() {
	return (
		<div className='mx-50 rounded-4xl min-h-screen lg:mx-20'>
			<Header buttonHide={false} searchHide={false}/>
			<div className='flex flex-col mx-20 py-10'>
				<Title text='Настройки'/>
				<div className='grid grid-rows-3 gap-5 justify-between mt-10'>
					<div className='flex flex-col w-180 h-auto bg-neutral-300/20 rounded-xl gap-3'>
						<header className='flex flex-row w-auto border-b border-neutral-300 pb-5 p-8'>
							<h1 className='font-bold text-2xl'>1. Персональные данные</h1>
						</header>
						<div className='grid grid-cols-2 gap-8 p-8'>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>Имя</Label>
								<Input type='text' placeholder='Имя' className='h-11'/>
							</div>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>Фамилия</Label>
								<Input type='text' placeholder='Фамилия' className='h-11'/>
							</div>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>E-mail</Label>
								<Input type='email' placeholder='E-mail' className='h-11'/>
							</div>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>Телефон</Label>
								<Input type='tel' placeholder='+7(777)777-77-77' className='h-11'/>
							</div>
						</div>
					</div>
					<div className='flex flex-col w-auto h-auto bg-neutral-300/20 rounded-xl gap-3'>
						<header className='flex flex-row w-auto border-b border-neutral-300 pb-5 p-8'>
							<h1 className='font-bold text-2xl'>2. Адрес доставки</h1>
						</header>
						<div className='flex flex-col gap-8 pt-8 pb-2 px-8'>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>Адрес</Label>
								<Input type='text' placeholder='г. Борисоглебск, Юго-Восточный м-он' className='h-11'/>
							</div>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>Дом,квартира</Label>
								<Input type="tel" placeholder="д. 12, кв. 2" className='h-11'/>
							</div>
						</div>
					</div>
					<div className='flex flex-col w-auto h-auto bg-neutral-300/20 rounded-xl gap-3'>
						<header className='flex flex-row w-auto border-b border-neutral-300 pb-5 p-8'>
							<h1 className='font-bold text-2xl'>3. Реквизиты карты</h1>
						</header>
						<div className='flex flex-col gap-8 pt-8 pb-2 px-8'>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>Номер карты</Label>
								<Input type="tel" placeholder="•••• •••• •••• 3245" pattern="[0-9\s]{13,19}" className='h-11'/>
							</div>
							<div className='grid grid-cols-2 gap-8'>
								<div className='flex flex-col gap-2'>
									<Label className='font-bold text-sm'>СVV</Label>
									<Input type="tel" placeholder="•• / ••" className='h-11'/>
								</div>
								<div className='flex flex-col gap-2 '>
									<Label className='font-bold text-sm'>ПИН-код</Label>
									<Input type="tel" placeholder="••••" className='h-11'/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}