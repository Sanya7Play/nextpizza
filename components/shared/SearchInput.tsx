'use client'
import {Search} from "lucide-react";
import PopoverInput from "@/components/shared/PopoverInput";
import {Input} from "@/components/ui/input";
import {useClickAway} from "@uidotdev/usehooks";
import {Product} from "@/generated/prisma";
import {useProviders} from "@/components/shared/context/CategoryFilter";

interface Props {
	products: Product[];
	searchHide: boolean;
	search: string;
}

export default function SearchInput({products, searchHide, search}: Props) {
	const {focused, setFocused, setSearch, setSearchProducts} = useProviders();
	const open = focused;
	const ref = useClickAway<HTMLDivElement>(() => {
		setFocused(false);
		setSearch('');
		setSearchProducts([]);
	});

	const anchor = (
		<div className="relative h-11 z-30 2xl:w-160 xl:w-100 lg:w-50 md:w-50">
			<Search className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
			<Input
				type="text"
				placeholder="Поиск..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onFocus={() => setFocused(true)}
				className="w-full h-full bg-neutral-300/40 outline-none pl-10 pr-3 rounded-2xl focus-visible:border-ring"
			/>
		</div>
	);
	return (
		<>
			{focused && <div className="fixed inset-0 bg-black/10 z-30"/>}
			<div ref={ref} className="relative z-30">
				{searchHide && (
					<PopoverInput open={open} products={products} anchor={anchor} />
				)}
			</div>
		</>
	);
}