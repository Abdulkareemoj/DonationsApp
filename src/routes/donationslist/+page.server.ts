import type { PageServerLoad } from './$types';
import { fetchDonations } from '$lib/server/donations';

export const load: PageServerLoad = async () => ({
	donations: await fetchDonations(),
	error: null
});
