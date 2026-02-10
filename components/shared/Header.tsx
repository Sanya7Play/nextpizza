'use client'
import Image from "next/image";
import {Search, ShoppingCart, User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CardDrawer from "@/components/shared/CardDrawer";
import {useEffect, useState} from "react";
import PopoverMenu from "@/components/shared/PopoverMenu";
import Link from "next/link";
import PopoverInput from "@/components/shared/PopoverInput";
import {useCartStore} from "@/components/store/cart";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import {Product} from "@/generated/prisma/client";
import axios from "axios";
import { signIn,useSession } from "next-auth/react";
import {z} from "zod";
import AuthModal from "@/components/shared/AuthModal";
import {LoginSchema} from "@/types/schemas";

interface HeaderProps {
	buttonHide: boolean,
	searchHide: boolean
}
export default function Header({buttonHide, searchHide}: HeaderProps) {
	const { data: session, status } = useSession();
	const {search, setSearch, loadingButton, setLoadingButton } = useProviders();
	const [products, setProducts] = useState<Product[]>([]);
	const [error, setError] = useState<string[]>([]);
	const totalCount = useCartStore(state => state.totalCount);
	const totalPrice = useCartStore(state => state.totalPrice);
	useEffect(() => {
		try {
			const searchProduct = async () => {
				if (!search || search.trim().length <= 3 || search.length === 0){
					setProducts([])
					return;
				}
				const response = await axios.get("/api/products", {
					params: { query: search },
				});
				setProducts(response.data);
			};
			searchProduct();
		}
		catch (err) {
			console.log(err);
		}
		finally {

		}
	}, [search]);
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
		const data = {
			email: email,
			confirmPassword: confirmPassword,
			password: password,
			fullName: fullName
		}
		const response = await axios.post('/api/auth/register', data);
		console.log(response.data)
	}
	const handleInput = (value: string) => {
		setSearch(value);
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
				<div className='relative h-11 2xl:w-160 xl:w-100 lg:w-50 md:w-50'>
					{searchHide &&
						<>
                            <Search
                                className='absolute w-5 h-5 left-3 top-3 text-muted-foreground'
                            />
                            <PopoverInput products={products}>
                                <Input
                                    type='text'
                                    placeholder='Поиск...'
                                    onChange={(e) => handleInput(e.target.value)}
                                    className='w-full h-full bg-neutral-200/60 outline-none pl-10 pr-3 rounded-2xl focus-visible:border-ring'
                                />
                            </PopoverInput>
						</>
					}
				</div>
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