'use client'
import Header from "@/components/shared/Header";
import Title from "@/components/shared/Title";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {User} from "@/generated/prisma";
import {useSession} from "next-auth/react";
import Locked from "@/app/locked";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import {Loader} from "lucide-react";
import {toast, Toaster} from "react-hot-toast";
import React from "react";

export default function Options() {
	const {data: session, status} = useSession();
	const {user, setUser, loading, setLoading} = useProviders();

	const handleChange = (field: keyof User, value: string) => {
		if (!user) return;
		setUser({...user, [field]: value});
	};
	const saveOptions = async () => {
		setLoading(true);
		try {
			const response = await axios.patch(`/api/users?userId=${user?.userId}`, user);
			setUser(response.data);
			notify(response.status);
		}
		catch (err){

		}
		finally {
			setLoading(false);
		}
	}
	if (!session) return Locked();
	const notify = (status: number) =>  {
		if (status === 200) {
			toast.success('Успешное сохранение данных');
		}
		else{
			toast.error('Ошибка сохранения данных');
		}
	}
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
								<Label className='font-bold text-sm'>Имя пользователя</Label>
								<Input
									type='text'
									placeholder='Полное имя'
									className='h-11 focus-visible:border-ring'
									value={user?.fullName || ''}
									onChange={(e) => setUser({...user, fullName: e.target.value})}
								/>
							</div>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>E-mail</Label>
								<Input
									type='email'
									placeholder='E-mail'
									className='h-11'
									value={user?.email || ''}
									onChange={(e) => handleChange('email',e.target.value)}
								/>
							</div>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>Телефон</Label>
								<Input
									type='tel'
									placeholder='+7(777)777-77-77'
									className='h-11'
									value={user?.telephone || ''}
									onChange={(e) => handleChange('telephone',e.target.value)}
								/>
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
								<Input
									type='text'
									placeholder='г. Борисоглебск, Юго-Восточный м-он'
									className='h-11'
									value={user?.address || ''}
									onChange={(e) => handleChange('address',e.target.value)}
								/>
							</div>
							<div className='flex flex-col gap-2 '>
								<Label className='font-bold text-sm'>Дом, квартира</Label>
								<Input
									type="text"
									placeholder="д. 12, кв. 2"
									className='h-11'
									value={user?.apartment || ''}
									onChange={(e) => handleChange('apartment',e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className='flex gap-4'>
						{loading ? (
							<Button
								className='w-full max-w-[440px] rounded-2xl py-6 text-base font-semibold cursor-pointer'
								disabled
							>
								<p className='animate-spin'>
									<Loader/>
								</p>
							</Button>
						):(
							<>
								<Button
									variant='default'
									className='cursor-pointer'
									onClick={() => saveOptions()}
								>
									Сохранить изменения
								</Button>
								<Toaster
									position={"top-center"}
									reverseOrder={true}
									toastOptions={{
										duration: 3000,
									}}
								/>
							</>
						)
						}
						<Button
							variant='secondary'
							className='cursor-pointer'
							onClick={() => window.location.reload()}
						>
							Отмена
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}