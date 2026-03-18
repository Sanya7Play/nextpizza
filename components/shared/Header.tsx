'use client'
import Image from "next/image";
import {ShoppingCart, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import CardDrawer from "@/components/shared/CardDrawer";
import React, {useEffect, useState} from "react";
import PopoverMenu from "@/components/shared/PopoverMenu";
import Link from "next/link";
import {useCartStore} from "@/components/store/cart";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import {Product} from "@/generated/prisma/client";
import axios, {isAxiosError} from "axios";
import { signIn,useSession } from "next-auth/react";
import AuthModal from "@/components/shared/AuthModal";
import {LoginSchema, RegisterSchema} from "@/types/schemas";
import SearchInput from "@/components/shared/SearchInput";
import {useDebounce } from 'react-use';

interface HeaderProps {
	buttonHide: boolean,
	searchHide: boolean
}
export type ProductTotal = {
	total: number;
	products: Product[];
}
export default function Header({buttonHide, searchHide}: HeaderProps) {
	const { data: session, status } = useSession();
	const {search, loadingButton, setLoadingButton, error, setError, setLoading, searchProducts, setSearchProducts} = useProviders();
	const totalCount = useCartStore(state => state.totalCount);
	const totalPrice = useCartStore(state => state.totalPrice);

	useDebounce(
		async () => {
			setLoading(true);
			try {
				const searchProduct = async () => {
					if (!search || search.trim().length <= 2 || search.length === 0 ){
						setSearchProducts([]);
						return;
					}
					const response = await axios.get<ProductTotal>("/api/products", {
						params: { query: search },
					});
					console.log(response.data.products);
					setSearchProducts(response.data.products);
				};
				searchProduct();
			} catch (error) {
				console.log(error);
			}
			finally {
				setLoading(false);
			}
		},
		300,
		[search],
	);

	async function submit(email: string, password: string) {
		setLoadingButton(true);
		try {
			const result = await LoginSchema.safeParseAsync({email, password});
			if (!result.success){
				setError(result.error?.issues.map(issue => issue.message) ?? []);
				return;
			}
			setError([]);
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (res?.error) {
				setError(['Неправильный логин или пароль']);
			}
		}
		catch (err){
			setError(['Произошла ошибка'])
		}
		finally {
			setLoadingButton(false);
		}
	}
	async function register(email: string, password: string, fullName: string, confirmPassword: string) {
		setLoadingButton(true)
		try {
			const data = {
				email: email,
				confirmPassword: confirmPassword,
				password: password,
				fullName: fullName
			}
			const result = await RegisterSchema.safeParseAsync(data);
			if (!result.success){
				setError(result.error?.issues.map(issue => issue.message) ?? []);
				return;
			}
			const response = await axios.post('/api/auth/register', data);
			if (response.status !== 201) {
				setError([]);
			}
			await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
		}
		catch (err) {
			if (isAxiosError(err)){
				const status = err.response?.status;
				const message = err.response?.data?.error;

				if (status === 409) {
					setError([message || 'Пользователь уже существует']);
				} else if (status === 400) {
					setError([message || 'Некорректные данные']);
				} else {
					setError(['Ошибка сервера']);
				}
			}
		}
		finally {
			setLoadingButton(false);
		}
	}
	return(
		<>
			<div className='flex flex-row items-center justify-between px-18 py-15 border-b border-gray-200'>
				<div className='flex flex-row items-center justify-between gap-3 cursor-pointer'>
					<Link href='/'>
						<Image src='/logo.png' alt='LogoImage' width={35} height={35} />
					</Link>
					<div>
						<p className='font-black text-2xl '>NEXT PIZZA</p>
						<p className='font-normal text-muted-foreground'>вкусней уже некуда</p>
					</div>
				</div>
				<SearchInput searchHide={searchHide} products={searchProducts} search={search}/>
				<div className='flex flex-row items-center justify-between gap-3'>
					{status === 'authenticated' ?
						(
							<PopoverMenu>
								<Button variant='outline' className='p-5.5 cursor-pointer gap-1 rounded-2xl'><User size={16}/>Профиль</Button>
							</PopoverMenu>
						) :
						(
							<AuthModal submit={submit} register={register} error={error} loading={loadingButton} >
								<Button
									variant='outline'
									className='p-5.5 cursor-pointer gap-1 rounded-xl'
								>
									<User size={16}/>
									Войти
								</Button>
							</AuthModal>
						)
					}
					{buttonHide &&
						<>
                            <CardDrawer session={session}>
                                <Button
                                    variant='default'
                                    className='group p-6 cursor-pointer rounded-2xl text-base font-extrabold gap-3'>
                                    <p className='flex flex-row items-center gap-1 group-hover:-translate-x-1 duration-300'>{totalPrice} ₽</p>
                                    <p className='border-r border-gray-100/50 h-5'></p>
                                    <p className='flex flex-row items-center gap-1 group-hover:translate-x-1 duration-300'><ShoppingCart size={16} strokeWidth={3}/>{totalCount}</p>
                                </Button>
                            </CardDrawer>
						</>
					}
				</div>
			</div>
		</>
	)
}