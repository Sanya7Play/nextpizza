import {
	Dialog, DialogClose,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import React from "react";
import {Ingredients} from ".prisma/client";
import {IProduct} from "@/components/constants/pizza";
import WindowCardItem from "@/components/shared/WindowCardItem";
import { X } from 'lucide-react';

interface Props {
	children: React.ReactNode;
	name: string;
	price: number;
	imageUrl: string;
	id: number;
	loading: boolean;
	ingredients: Ingredients[];
}

export default function DialogWindow({children, imageUrl, ingredients, price, name, id}: Props) {
	const product: IProduct  = {name, price, imageUrl, id};
	return(
		<Dialog>
			<form>
				<DialogTrigger asChild>
					{children}
				</DialogTrigger>
				<DialogContent className="sm:max-w-[1250px] h-auto absoulte" showCloseButton={false}>
					<div>
						<DialogClose asChild>
							<X className="absolute right-4 top-4 text-gray-400 hover:text-gray-300 cursor-pointer" width={30} height={30}/>
						</DialogClose>
					</div>
					<DialogHeader>
						<DialogTitle></DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>

					<div className="flex flex-row">
						<WindowCardItem
							product={product}
							ingredients={ingredients}
						/>
					</div>
					<DialogFooter>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}