
import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {X} from "lucide-react";
import {SignIn} from "@clerk/nextjs";

interface Props {
	children: React.ReactNode;
}

export default function DialogLogin({children}: Props) {
	return(
		<Dialog>
			<form>
				<DialogTrigger asChild>
					{children}
				</DialogTrigger>
				<DialogContent className="sm:max-w-[400px] h-[280px] rounded-2xl" showCloseButton={false}>
					<div>
						<DialogClose asChild>
							<X className="absolute right-4 top-4 text-gray-400 hover:text-gray-300 cursor-pointer" width={30} height={30}/>
						</DialogClose>
					</div>
					<DialogHeader className='flex flex-row px-5 items-center'>
						<div className='flex flex-col gap-1 justify-between'>
							<DialogTitle className='text-2xl'>Вход в аккаунт</DialogTitle>
							<DialogDescription>Введите номер телефона, чтобы войти или зарегистрироваться</DialogDescription>
						</div>
						<img src='mobile.png' width={50} height={50} alt='mobile'/>
					</DialogHeader>
					<div className='flex flex-col px-5 gap-5'>
						<Input
							type='tel'
							placeholder='+7 (___) ___-__-__'
						/>
						<Button
							className='cursor-pointer rounded-xl'
						>
							Получить код в SMS
						</Button>
					</div>
					<DialogFooter>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}