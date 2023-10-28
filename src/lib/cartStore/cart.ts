import { z } from 'zod';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const itemZodSchema = z.strictObject({
	id: z.number(),
	name: z.string(),
	price: z.number(),
	img_url: z.string().nullable(),
	description: z.string().nullish(),
	stripe_price_id: z.coerce.number(),
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

	function Post(data: itemType) {
		store.update((value) => {
			if (!value) {
				return value;
			}
			localStorage.setItem(localStorageKey, JSON.stringify([...value, data]));
			return [...value, data];
		});
	}

	function Delate(cartId: number) {
		const unSubscribe = store.subscribe((item) => {
			if (!item) {
				return;
			}

			const updatedValues = item.filter((value) => value.id !== cartId);

			item = updatedValues
			localStorage.setItem(localStorageKey, JSON.stringify(updatedValues))
		});

		unSubscribe();
	}

	return {
		Get,
		Post,
		Delate
	};
};
