import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { donationSchema } from './schema';
import { fetchDonations } from '$lib/server/donations';

export const load: PageServerLoad = async () => {
	const [form, donations] = await Promise.all([
		superValidate(zod(donationSchema)),
		fetchDonations()
	]);

	return { form, donations };
};
