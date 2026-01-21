import {create} from "zustand/react";
import {ICartItem} from "@/components/constants/pizza";
type CartState = {
	items: ICartItem[],

	addItem: (item: ICartItem) => void,
	removeItem: (item: ICartItem) => void,
	removeQuantity: (item: ICartItem) => void,
	clearCart: () => void,

};

export const useCartStore = create<CartState>((set, get) => ({
	items: [],


	addItem: (item) =>
		set((state) => {
			const existing = state.items.find(
				(i) =>
					i.id === item.id &&
					i.size === item.size &&
					i.daugh === item.daugh
			);

			if (existing) {
				return {
					items: state.items.map((i) =>
						i === existing
							? { ...i, quantity: i.quantity + 1, price: i.price + existing.price}
							: i
					),
				};
			}

			return { items: [...state.items, item] };
		}),

	removeItem: (item) =>
		set((state) => {
			const existing = state.items.find(
				(i) =>
					i.id === item.id &&
					i.size === item.size &&
					i.daugh === item.daugh
			);

			if (existing) {
				return {
					items: state.items.filter((i) => i.id !== existing.id),
				};
			}

			return { items: [...state.items] };
		}),


	clearCart: () => set({ items: [] }),

	removeQuantity: (item) =>
		set((state) => {
			const existing = state.items.find(
				(i) =>
					i.id === item.id &&
					i.size === item.size &&
					i.daugh === item.daugh
			);

			if (!existing) {
				// ничего не делаем, если такого нет
				return state;
			}

			return {
				items: state.items.map((i) =>
					i === existing
						? { ...i, quantity: i.quantity - 1, price: i.price / 2 }
						: i
				),
			};
		}),
}));

