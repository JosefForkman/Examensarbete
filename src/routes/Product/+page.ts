import type { PageLoad } from './$types';
import produkts from "$lib/MOCK_DATA.json";

export const load = (async () => {
	return {produkts};
}) satisfies PageLoad;
