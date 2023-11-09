import { string, z } from 'zod';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const itemZodSchema = z.strictObject({
	id: z.number(),
	name: z.string(),
	price: z.number(),
	img_url: z.string().nullable(),
	description: z.string().nullish(),
	stripe_price_id: string(),
	quantity: z.number()
});

export const itemArraySchema = z.array(itemZodSchema);

type itemType = z.infer<typeof itemZodSchema>;

export const cartStore = (value: itemType[] = [], localStorageKey = 'cart') => {
	const store = writable<itemType[] | null>(value);

	/* Check if access to localStorage */
	if (browser) {
		const cartLocal = localStorage.getItem(localStorageKey);

		/* Check if we already have things in localStorage and set default values */
		if (!cartLocal) {
			localStorage.setItem(localStorageKey, JSON.stringify(value));
		}

		const cartLocalParse: itemType[] | null = JSON.parse(cartLocal!);
		store.set(cartLocalParse);
	}

	function Get() {
		return store;
	}

	function Post(newItem: itemType) {
		store.update((currentItems) => {
			/* if item already exist */
			if (!currentItems) {
				localStorage.setItem(localStorageKey, JSON.stringify([newItem]));
				return [newItem];
			}

			const updateItemIndex = currentItems.findIndex((item) => item.id == newItem.id);

			/* if item not exist */
			if (!updateItemIndex) {
				currentItems[updateItemIndex].quantity = currentItems[updateItemIndex].quantity + 1;

				localStorage.setItem(localStorageKey, JSON.stringify(currentItems));
				return currentItems;
			}

			/* if item already exist */
			localStorage.setItem(localStorageKey, JSON.stringify([newItem, ...currentItems]));
			return [newItem, ...currentItems];
		});
	}

	function Remove(cartId: number) {
		store.update((item) => {
			if (!item) {
				return item;
			}

			const updatedValues = item.filter((value) => value.id !== cartId);

			localStorage.setItem(localStorageKey, JSON.stringify(updatedValues));

			return updatedValues;
		});
	}

	function Clear() {
		store.set([]);		
		localStorage.setItem(localStorageKey, JSON.stringify([]))
	}

	function UppdateQuantity(itemId: number, quantity: number) {
		store.update((currentItems) => {
			if (!currentItems) {
				return currentItems;
			}
			console.log('itemid:' + itemId, 'quant:' + quantity);

			for (let i = 0; i < currentItems.length; i++) {
				if (currentItems[i].id === itemId) {
					currentItems[i].quantity = quantity;
					localStorage.setItem(localStorageKey, JSON.stringify([...currentItems]));
					return [...currentItems];
				}
			}
			return [...currentItems];
		});
	}

	return {
		Get,
		Post,
		Remove,
		Clear,
		UppdateQuantity
	};
};
