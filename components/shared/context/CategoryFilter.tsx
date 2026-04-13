'use client'
import React, {createContext, useContext, useEffect, useState} from 'react';
import {sortArray} from "@/components/constants/pizza";
import axios from "axios";
import {useSession} from "next-auth/react";
import {Product, User} from "@/generated/prisma";
import {OrderWithItems} from "@/types/order";

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
	password: string,
	setPassword: (password: string) => void;
	confirmPassword: string,
	setConfirmPassword: (confirmPassword: string) => void;
	user: Partial<User>;
	setUser: (user: Partial<User>) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	emailInput: string;
	setEmailInput: (emailInput: string) => void;
	name: string;
	setName: (name: string) => void;
	error: string[];
	setError: (error: string[]) => void;
	orders: OrderWithItems[];
	setOrders: (orders: OrderWithItems[]) => void;
	delivery: string | undefined;
	setDelivery: (delivery: string | undefined) => void;
	focused: boolean;
	setFocused: (focused: boolean) => void;
	searchProducts: Product[];
	setSearchProducts: (searchProducts: Product[]) => void;
	timeDelivery: string;
	setTimeDelivery: (timeDelivery: string) => void;
	timeArray: string[];
}

const PizzaContext = createContext<ContextInterface | null>(null);

export function CategoryFilter({children}:{children: React.ReactNode}) {
	const { data: session } = useSession();
	const time = new Date().toLocaleString("ru-RU",{
		hour: "numeric",
		minute: "numeric",
	});
	const timeArray = Array.from({length: 22 - Number(time.slice(0,2))}, (_, i) => Number(time.slice(3)) < 30 ? (Number(time.slice(0,2)) + i + 1 + ':' + "00") : (Number(time.slice(0,2)) + i + 1  + ':' + "30"));
	const [timeDelivery, setTimeDelivery] = useState<string>(timeArray[0]);
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<number | null >(0);
	const [sort, setSort] = useState<string>(sortArray[0]?.name);
	const [search, setSearch] = useState<string>('');
	const [login, setLogin] = useState<boolean>(true);
	const [loadingButton, setLoadingButton] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [user, setUser] = useState<Partial<User>>({});
	const [emailInput, setEmailInput] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [error, setError] = useState<string[]>([]);
	const [orders, setOrders] = useState<OrderWithItems[]>([]);
	const [delivery, setDelivery] = useState<string | undefined>(user?.address + ' ' + user?.apartment || '');
	const [focused, setFocused] = useState<boolean>(false);
	const [searchProducts, setSearchProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (!session?.user?.email) return;
		async function getUser() {
			setLoading(true);
			try {
				const { data } = await axios.get('/api/users', {
					params: { email: session?.user.email }
				});
				setUser(data);

			} catch (err) {
				console.log(err);
			}
			finally {
				setLoading(false);
			}
		}
		getUser();
	}, [session?.user?.email]);
	return (
		<PizzaContext.Provider value={{
			user,
			setUser,
			searchProducts,
			setSearchProducts,
			focused,
			setFocused,
			delivery,
			setDelivery,
			orders,
			setOrders,
			error,
			setError,
			emailInput,
			setEmailInput,
			name,
			setName,
			loading,
			setLoading,
			password,
			setPassword,
			confirmPassword,
			setConfirmPassword,
			selectedCategory,
			setSelectedCategory,
			sort,
			setSort,
			search,
			setSearch,
			login,
			setLogin,
			loadingButton,
			setLoadingButton,
			timeDelivery,
			setTimeDelivery,
			timeArray,
		}}>
			{children}
		</PizzaContext.Provider>
	);
}
export function useProviders() {
	const context = useContext(PizzaContext);
	if (!context) throw new Error();
	return context;
}