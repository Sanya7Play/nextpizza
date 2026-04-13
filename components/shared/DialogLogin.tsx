import React from "react";
import {
	DialogClose,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Loader, X} from "lucide-react";
import {Label} from "@/components/ui/label";
import {signIn} from "next-auth/react";

interface Props {
	submit: (email: string, password: string) => void;
	error?: string[];
	loading?: boolean;
	email: string;
	password: string;
	setPassword: (password: string) => void;
	setEmail: (email: string) => void;
	onSwitch: () => void;
}
export default function DialogLogin({ submit, error, loading, email, password, setPassword, setEmail, onSwitch}: Props) {
	const authorization = (email: string, password: string) => {
		submit(email, password);
	}
	return(
		<>
			<div>
				<DialogClose asChild>
					<X className="absolute right-4 top-4 text-gray-400 hover:text-gray-300 cursor-pointer" width={20} height={20}/>
				</DialogClose>
			</div>
			<DialogHeader className='flex flex-row px-5 items-center'>
				<div className='flex flex-col gap-1 justify-between'>
					<DialogTitle className='text-2xl'>Вход в аккаунт</DialogTitle>
					<DialogDescription>Введите свою почту, чтобы войти в аккаунт</DialogDescription>
				</div>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src='/mobile.png' width={50} height={50} alt='mobile'/>
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
					<Label className='gap-1'>Пароль<span className='text-red-600'>*</span></Label>
					<Input
						type='password'
						className='border-muted-foreground/30'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
						onClick={() => authorization(email, password)}
					>
						Войти
					</Button>)
				}
				<span className='border-b-1 border-muted-foreground/40 mt-2'></span>
			</div>
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
			<Button
				className='cursor-pointer rounded-xl w-auto mt-2 mx-5 text-center'
				variant="outline"
				onClick={() => onSwitch()}
			>
				Регистрация
			</Button>
			<DialogFooter>
			</DialogFooter>
		</>
	)
}