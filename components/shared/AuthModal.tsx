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
	const {emailInput, password, setEmailInput, setPassword, name, setName, confirmPassword, setConfirmPassword, setError} = useProviders()
	const [type, setType] = useState<'login' | 'register'>('login');
	const onSwitch = () => {
		setType(type === 'login' ? 'register' : 'login');
		setError([]);
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
							email={emailInput}
							password={password}
							setPassword={setPassword}
							setEmail={setEmailInput}
							onSwitch={onSwitch}
						/>
					) : (
						<DialogRegister
							register={register}
							error={error}
							loading={loading}
							email={emailInput}
							password={password}
							setPassword={setPassword}
							setEmail={setEmailInput}
							fullName={name}
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