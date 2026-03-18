'use client'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Link from "next/link";
import {Product} from "@/generated/prisma/client";
import React from "react";
import Image from "next/image";
interface propsPopoverInput {
	products: Product[];
	open: boolean;
	anchor: React.ReactNode;
}

export default function PopoverInput({anchor, products, open}: propsPopoverInput) {
	return (
		<>
			<Popover open={open}>
				<PopoverTrigger asChild>
					{/* якорь для позиционирования */}
					{anchor as never}
				</PopoverTrigger>
				<PopoverContent
					onOpenAutoFocus={(e) => e.preventDefault()}
					className="w-250 rounded-2xl h-auto 2xl:w-160 xl:w-100 lg:w-50 md:w-50">
					<div className="flex flex-col gap-4">
						{products.length > 0 ? (products.map((product) => (
							<>
								<Link
									key={product.id}
									href={`/product/${product.id}`}
									className="hover:text-primary"
								>
									<div className='flex flex-row items-center gap-3'>
										<Image src={product.imageUrl} alt={product.name} width={30} height={30}/>
										<span>{product.name}</span>
										<span className='text-muted-foreground'>{product.price} ₽</span>
									</div>

								</Link>
							</>

						))) : (<div className="text-muted-foreground">Ничего не найдено</div>)}
					</div>
				</PopoverContent>
			</Popover>
		</>

	);
}