import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { donationSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { AIRTABLE_TOKEN, AIRTABLE_TOKEN_ID } from '$env/static/private';
import Airtable from 'airtable';
import type { Donation } from '$lib/types';

async function fetchDonations(): Promise<Donation[]> {
	if (!AIRTABLE_TOKEN || !AIRTABLE_TOKEN_ID) {
		return [];
	}

	try {
		const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_TOKEN_ID);

		return await new Promise((resolve, reject) => {
			const allDonations: Donation[] = [];
			base('Donors')
				.select({})
				.eachPage(
					(records, fetchNextPage) => {
						const page = records.map((record) => {
							const fields = record.fields as Record<string, unknown>;
							const imageArray = (fields.Image as { url: string }[] | undefined) || [];
							return {
								id: record.id,
								name: typeof fields.Name === 'string' ? fields.Name : '',
								status: typeof fields.Status === 'string' ? fields.Status : '',
								amount:
									typeof fields.Price === 'number'
										? fields.Price
										: parseFloat(String(fields.Price ?? 0)) || 0,
								quantity:
									typeof fields.Quantity === 'number'
										? fields.Quantity
										: parseInt(String(fields.Quantity ?? 0)) || 0,
								date: typeof fields.Date === 'string' ? fields.Date : String(fields.Date ?? ''),
								imageUrl: imageArray[0]?.url || '/placeholder.svg',
								message: typeof fields.Message === 'string' ? fields.Message : ''
							} satisfies Donation;
						});
						allDonations.push(...page);
						fetchNextPage();
					},
					(err) => {
						if (err) reject(err);
						else resolve(allDonations);
					}
				);
		});
	} catch {
		return [];
	}
}

export const load: PageServerLoad = async () => {
	const [form, donations] = await Promise.all([
		superValidate(zod(donationSchema)),
		fetchDonations()
	]);

	return { form, donations };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(donationSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			if (AIRTABLE_TOKEN && AIRTABLE_TOKEN_ID) {
				const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_TOKEN_ID);

				await base('Donors').create([
					{
						fields: {
							Name: form.data.name,
							Email: form.data.donationEmail,
							Message: form.data.message || '',
							Amount: form.data.amount,
							DonationType: form.data.selectedDonation,
							Date: new Date().toISOString()
						}
					}
				]);

				return message(form, 'Thank you for your donation!');
			} else {
				console.warn('Airtable Token or ID is missing');
				return message(form, 'Donation received (test mode)');
			}
		} catch (error) {
			console.error('Error saving to Airtable:', error);
			return fail(500, {
				form,
				error: 'Failed to process donation. Please try again.'
			});
		}
	}
};
