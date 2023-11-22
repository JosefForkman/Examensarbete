import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { cartType } from '$lib/types/Schema';

export const cartStore = (value: cartType[] = [], localStorageKey = 'cart') => {
	const store = writable<cartType[] | null>(value);

	/* Check if access to localStorage */
	if (browser) {
		const cartLocal = localStorage.getItem(localStorageKey);

		/* Check if we already have things in localStorage and set default values */
		if (!cartLocal) {
			localStorage.setItem(localStorageKey, JSON.stringify(value));
		}

		const cartLocalParse: cartType[] | null = JSON.parse(cartLocal!);
		store.set(cartLocalParse);
	}

	function Get() {
		return store;
	}

	function Post(newItem: cartType) {
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
		localStorage.setItem(localStorageKey, JSON.stringify([]));
	}

	function UppdateQuantity(itemId: number, quantity: number) {
		store.update((currentItems) => {
			if (!currentItems) {
				return currentItems;
			}

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
