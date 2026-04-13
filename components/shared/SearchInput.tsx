'use client'
import {Search, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import React, {useState} from "react";
import Link from "next/link";
import {Product} from "@/generated/prisma";
import Image from "next/image";

interface Props {
	searchHide: boolean;
}

export default function SearchInput({searchHide}: Props) {
	const {search, setSearch, searchProducts} = useProviders();
	const [open, setOpen] = useState<boolean>(false);
	return (
		<>
			{searchHide &&
				<div className="relative h-11 z-30 2xl:w-160 xl:w-100 lg:w-50 md:w-50">
                <Search className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Поиск..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => {
						setOpen(true);
					}}
                    className="w-full h-full bg-neutral-300/40 outline-none pl-10 pr-3 rounded-2xl focus-visible:border-ring"
                />
					{open && <X
                        className="absolute w-5 h-5 right-3 top-3 text-muted-foreground/50 cursor-pointer hover:text-muted-foreground"
                        onClick={() => {
							setSearch('');
							setOpen(false);
						}}
                    />}
				{open && searchProducts.length > 0 && (
					<div className="absolute top-full left-0 w-full bg-white shadow-xl/30 border rounded-xl mt-2 z-50">
						<div className={`flex flex-col`}>
							{searchProducts.map((product: Product) => (
								<Link
									key={product.id}
									href={`/product/${product.id}`}
									onClick={() => setSearch('')}
								>
									<div className='flex flex-row items-center gap-3 p-2 my-3 mx-2 rounded-xs hover:bg-primary/10'>
										<Image src={product.imageUrl} alt={product.name} width={30} height={30}/>
										<span>{product.name}</span>
										<span className='text-muted-foreground'>{product.price} ₽</span>
									</div>
								</Link>
							))}
						</div>
					</div>

				)}
            </div>
			}
		</>
	);
}