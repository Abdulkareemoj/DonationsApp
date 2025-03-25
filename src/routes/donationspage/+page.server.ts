import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { donationSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '$env/static/private';
import Airtable from 'airtable';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(donationSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(donationSchema));
		console.log('Form from superValidate:', form);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			// Only try to save to Airtable if we have the API key and base ID
			if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
				const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

				// Save the form data to Airtable
				await base('Donors').create([
					{
						fields: {
							Name: form.data.name,
							Email: form.data.donationEmail,
							Message: form.data.message || '',
							Amount: form.data.amount,
							DonationType: form.data.selectedDonation || 'one-time',
							// PrivateMessage: form.data.privateMessage || false,
							Date: new Date().toISOString()
						}
					}
				]);

				// Return success message
				return {
					form,
					success: true
				};
			} else {
				console.warn('Airtable API key or Base ID is missing');
				// Still return success for testing purposes
				return {
					form,
					success: true,
					warning: 'Airtable credentials missing'
				};
			}
		} catch (error) {
			console.error('Error saving to Airtable:', error);
			return fail(500, {
				form,
				error: 'Failed to save donation'
			});
		}
	}
};
