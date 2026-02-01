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
}

const PizzaContext = createContext<ContextInterface | null>(null);

export function CategoryFilter({children}:{children: React.ReactNode}) {
	const [selectedCategory, setSelectedCategory] = useState<number | null >(null);
	const [sort, setSort] = useState<string>(sortArray[0]?.name);
	const [search, setSearch] = useState<string>('');
	const [login, setLogin] = useState<boolean>(true);
	return (
		<PizzaContext.Provider value={{selectedCategory,setSelectedCategory, sort, setSort, search, setSearch, login, setLogin}}>
			{children}
		</PizzaContext.Provider>
	);
}
export function useProviders() {
	const context = useContext(PizzaContext);
	if (!context) throw new Error();
	return context;
}