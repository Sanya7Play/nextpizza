import { create } from "zustand";

export type CartIngredient = {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
};

export type CartItem = {
	id: number;
	key: string;        // уникальный ключ позиции
	productId: number;
	name: string;
	imageUrl: string;
	category: string;

	unitPrice: number;  // цена за 1 штуку (уже с размером/тестом/допами)
	size: string;
	dough: string;
	weight: number;
	sizeNumber: number;

	ingredients: CartIngredient[];
	quantity: number;
};

type CartState = {
	items: CartItem[];

	addItem: (item: Omit<CartItem, "quantity">) => void;
	incrementCart: (key: string) => void;
	decrementCart: (key: string) => void;
	removeItem: (key: string) => void;
	clearCart: () => void;

	totalCount: number;
	totalPrice: number;
};

export const useCartStore = create<CartState>((set) => ({

	items: [],
	totalCount: 0,
	totalPrice: 0,

	addItem: (item) =>
		set((state) => {
			const existing = state.items.find((i) => i.key === item.key);

			let nextItems: CartItem[];
			if (existing) {
				nextItems = state.items.map((i) =>
					i.key === item.key ? { ...i, quantity: i.quantity + 1 } : i
				);
			} else {
				nextItems = [...state.items, { ...item, quantity: 1 }];
			}

			const totalCount = nextItems.reduce((s, i) => s + i.quantity, 0);
			const totalPrice = nextItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

			return { items: nextItems, totalCount, totalPrice };
		}),

	incrementCart: (key) =>
		set((state) => {
			const nextItems = state.items.map((i) =>
				i.key === key ? { ...i, quantity: i.quantity + 1 } : i
			);
			const totalCount = nextItems.reduce((s, i) => s + i.quantity, 0);
			const totalPrice = nextItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
			return { items: nextItems, totalCount, totalPrice };
		}),

	decrementCart: (key) =>
		set((state) => {
			const nextItems = state.items
				.map((i) => (i.key === key ? { ...i, quantity: i.quantity - 1 } : i))
				.filter((i) => i.quantity > 0);

			const totalCount = nextItems.reduce((s, i) => s + i.quantity, 0);
			const totalPrice = nextItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
			return { items: nextItems, totalCount, totalPrice };
		}),

	removeItem: (key) =>
		set((state) => {
			const nextItems = state.items.filter((i) => i.key !== key);
			const totalCount = nextItems.reduce((s, i) => s + i.quantity, 0);
			const totalPrice = nextItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
			return { items: nextItems, totalCount, totalPrice };
		}),

	clearCart: () => set({ items: [], totalCount: 0, totalPrice: 0 }),
}));
