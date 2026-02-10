'use client'
import React, {useState} from "react";
import {
	Dialog,
	DialogContent,
	DialogTrigger
} from "@/components/ui/dialog";
import DialogLogin from "@/components/shared/DialogLogin";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import DialogRegister from "@/components/shared/DialogRegister";

interface Props {
	submit: (email: string, password: string) => void;
	register: (email: string, password: string, fullName: string, confirmPassword: string) => void;
	children: React.ReactNode;
	error?: string[];
	loading?: boolean;
}
export default function AuthModal({children, submit, error, loading, register}: Props) {
	const {email, password, setEmail, setPassword, fullName, setName, confirmPassword, setConfirmPassword} = useProviders()
	const [type, setType] = useState<'login' | 'register'>('login');
	const onSwitch = () => {
		setType(type === 'login' ? 'register' : 'login');
	}
	return(
		<Dialog>
			<form>
				<DialogTrigger asChild>
					{children}
				</DialogTrigger>
				<DialogContent className="sm:max-w-[400px] h-auto rounded-2xl" showCloseButton={false}>
					{type === 'login' ? (
						<DialogLogin
							submit={submit}
							error={error}
							loading={loading}
							email={email}
							password={password}
							setPassword={setPassword}
							setEmail={setEmail}
							onSwitch={onSwitch}
						/>
					) : (
						<DialogRegister
							register={register}
							error={error}
							loading={loading}
							email={email}
							password={password}
							setPassword={setPassword}
							setEmail={setEmail}
							fullName={fullName}
							setName={setName}
							confirmPassword={confirmPassword}
							setConfirmPassword={setConfirmPassword}
							onSwitch={onSwitch}
						/>
					)}
				</DialogContent>
			</form>
		</Dialog>
	)
}