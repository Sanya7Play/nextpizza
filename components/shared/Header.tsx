'use client'
import Image from "next/image";
import {Search, ShoppingCart, User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CardDrawer from "@/components/shared/CardDrawer";
import {useState} from "react";
import PopoverMenu from "@/components/shared/PopoverMenu";
import Link from "next/link";
import PopoverInput from "@/components/shared/PopoverInput";

interface HeaderProps {
	buttonHide: boolean,
	searchHide: boolean
}

export default function Header({buttonHide, searchHide}: HeaderProps) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
	const items: string[] = ['12','23'];
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
				<div className='relative h-11 2xl:w-200 xl:w-110 lg:w-60 md:w-50'>
					{searchHide &&
						<>
                            <Search
                                className='absolute w-5 h-5 left-3 top-3 text-muted-foreground'
                            />

							<PopoverInput>
                                <Input
                                    type='text'
                                    placeholder='Поиск Пиццы...'
                                    className='w-full h-full bg-neutral-200/60 outline-none pl-10 pr-3 rounded-2xl focus-visible:border-ring'
                                />
							</PopoverInput>
						</>
					}
				</div>
				<div className='flex flex-row items-center justify-between gap-3'>
					{isAuthenticated ?
						(
							<PopoverMenu>
								<Button variant='outline' className='p-5.5 cursor-pointer gap-1 rounded-2xl'><User size={16}/>Профиль</Button>
							</PopoverMenu>
						) :
						(
							<Button variant='outline' className='p-5.5 cursor-pointer gap-1 rounded-2xl'><User size={16}/>Войти</Button>
						)
					}
					{buttonHide &&
						<>
							{items.length > 0 ?
								(
									<CardDrawer>
										<Button
											variant='default'
											className='group p-6 cursor-pointer rounded-2xl text-base font-extrabold gap-3'>
											<p className='flex flex-row items-center gap-1 group-hover:-translate-x-1 duration-300'>520 ₽</p>
											<p className='border-r border-gray-100/50 h-5'></p>
											<p className='flex flex-row items-center gap-1 group-hover:translate-x-1 duration-300'><ShoppingCart size={16} strokeWidth={3}/>3</p>
										</Button>
									</CardDrawer>
								) : (
									<Button variant='outline' className='p-6 cursor-pointer rounded-2xl'><ShoppingCart size={16}/></Button>
								)
							}
						</>
					}
				</div>
			</div>
		</>
	)
}