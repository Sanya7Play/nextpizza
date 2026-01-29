'use client'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Link from "next/link";
import {Product} from "@/generated/prisma/client";
import React from "react";
interface propsPopoverInput {
	children: React.ReactNode;
	products: Product[];
}

export default function PopoverInput({children, products}: propsPopoverInput) {
	return (
		<Popover open={products.length > 1}>
			<PopoverTrigger asChild>
				{children}
			</PopoverTrigger>

			<PopoverContent className="w-250 rounded-2xl h-auto 2xl:w-160 xl:w-110 lg:w-60 md:w-50">
				<div className="flex flex-col gap-4">
					{products.map((product) => (
						<Link
							key={product.id}
							href={`/product/${product.id}`}
							className="hover:text-primary"
						>
							{product.name}
						</Link>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}