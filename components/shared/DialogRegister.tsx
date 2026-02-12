import {
	DialogClose,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Loader, X} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {signIn} from "next-auth/react";

interface Props {
	register: (email: string, password: string, fullName: string, confirmPassword: string) => void;
	error?: string[];
	loading?: boolean;
	email: string;
	password: string;
	setPassword: (password: string) => void;
	setEmail: (email: string) => void;
	onSwitch: () => void;
	fullName: string;
	setName: (fullName: string) => void;
	confirmPassword: string;
	setConfirmPassword: (confirmPassword: string) => void;
}

export default function DialogRegister(
	{
		register,
		error,
		loading,
		email,
		password,
		setPassword,
		setEmail,
		onSwitch,
		setConfirmPassword,
		confirmPassword,
		setName,
		fullName
	}: Props) {
	const registration = (email: string, password: string, fullName: string, confirmPassword: string) => {
		register(email, password, fullName, confirmPassword);
	}
	console.log(fullName, email, password, confirmPassword);
	return(
		<>
		<div>
			<DialogClose asChild>
				<X className="absolute right-4 top-4 text-gray-400 hover:text-gray-300 cursor-pointer" width={20} height={20}/>
			</DialogClose>
		</div>
		<DialogHeader className='flex flex-row px-5 items-center'>
			<div className='flex flex-col gap-1 justify-between py-2'>
				<DialogTitle className='text-2xl'>Зарегистрироваться</DialogTitle>
				<DialogDescription>Заполните все поля, для прохождения регистрации</DialogDescription>
			</div>
		</DialogHeader>
		<div className='flex flex-col px-5 gap-5'>
			<div className='flex flex-col gap-2'>
				<Label className='gap-1'>E-Mail<span className='text-red-600'>*</span></Label>
				<Input
					type='email'
					className='border-muted-foreground/30'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<Label className='gap-1'>Полное имя<span className='text-red-600'>*</span></Label>
				<Input
					type='text'
					className='border-muted-foreground/30'
					value={fullName}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<Label className='gap-1'>Пароль<span className='text-red-600'>*</span></Label>
				<Input
					type='password'
					className='border-muted-foreground/30'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<Label className='gap-1'>Подтвердите пароль<span className='text-red-600'>*</span></Label>
				<Input
					type='password'
					className='border-muted-foreground/30'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>
			{error && <span className='text-red-600 text-sm px-1'>{error[0]}</span>}
			{loading ? (
				<Button
					className='w-full max-w-[440px] rounded-2xl py-6 text-base font-semibold cursor-pointer'
					disabled
				>
					<p className='animate-spin'>
						<Loader/>
					</p>
				</Button>):(
				<Button
					className='cursor-pointer rounded-xl'
					onClick={() => registration(email, password, fullName, confirmPassword)}
				>
					Зарегистрироваться
				</Button>)
			}
			<span className='border-b-1 border-muted-foreground/40 mt-2'></span>
			<div className='flex flex-row justify-center gap-10 mt-2 mx-5'>
				<Button
					variant='default'
					className='cursor-pointer rounded-xl w-1/2 bg-primary/10 text-primary gap-1 hover:bg-primary/20'
					onClick={() => signIn("github")}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/github-svgrepo-com.svg" alt="GitHub" width={15} height={15}/>
					GitHub
				</Button>
				<Button
					variant='default'
					className='cursor-pointer rounded-xl w-1/2 bg-primary/10 text-primary gap-1 hover:bg-primary/20'
					onClick={() => signIn("google")}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/google-svgrepo-com.svg" alt="Google" width={15} height={15}/>
					Google
				</Button>
			</div>
		</div>
		<Button

			className='cursor-pointer rounded-xl w-auto mt-2 mx-5 text-center'
			variant="outline"
			onClick={() => onSwitch()}
		>
			Вход
		</Button>
		<DialogFooter>
		</DialogFooter>
		</>
	)
}