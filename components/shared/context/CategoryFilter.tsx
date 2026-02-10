'use client'
import React, {createContext, useContext, useState} from 'react';
import {sortArray} from "@/components/constants/pizza";

interface ContextInterface {
	sort: string;
	setSort: (sort: string) => void;
	selectedCategory: number | null;
	setSelectedCategory: (selectedCategory: number) => void;
	search: string,
	setSearch: (search: string) => void;
	login: boolean,
	setLogin: (login: boolean) => void;
	loadingButton: boolean,
	setLoadingButton: (loadingButton: boolean) => void;
	email: string,
	setEmail: (email: string) => void;
	password: string,
	setPassword: (password: string) => void;
	fullName: string,
	setName: (name: string) => void;
	confirmPassword: string,
	setConfirmPassword: (confirmPassword: string) => void;
}

const PizzaContext = createContext<ContextInterface | null>(null);

export function CategoryFilter({children}:{children: React.ReactNode}) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [fullName, setName] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<number | null >(0);
	const [sort, setSort] = useState<string>(sortArray[0]?.name);
	const [search, setSearch] = useState<string>('');
	const [login, setLogin] = useState<boolean>(true);
	const [loadingButton, setLoadingButton] = useState<boolean>(false);
	return (
		<PizzaContext.Provider value={{email, setEmail, password, setPassword, fullName, setName, confirmPassword, setConfirmPassword, selectedCategory,setSelectedCategory, sort, setSort, search, setSearch, login, setLogin, loadingButton, setLoadingButton}}>
			{children}
		</PizzaContext.Provider>
	);
}
export function useProviders() {
	const context = useContext(PizzaContext);
	if (!context) throw new Error();
	return context;
}