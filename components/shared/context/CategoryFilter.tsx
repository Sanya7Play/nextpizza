'use client'
import React, {createContext, useContext, useState} from 'react';

interface ContextInterface {
	selectedCategory: number | null;
	setSelectedCategory: (selectedCategory: number) => void;
}

const PizzaContext = createContext<ContextInterface | null>(null);

export function CategoryFilter({children}:{children: React.ReactNode}) {
	const [selectedCategory, setSelectedCategory] = useState<number | null >(null);
	return (
		<PizzaContext.Provider value={{selectedCategory,setSelectedCategory}}>
			{children}
		</PizzaContext.Provider>
	);
}
export function useProviders() {
	const context = useContext(PizzaContext);
	if (!context) throw new Error();
	return context;
}