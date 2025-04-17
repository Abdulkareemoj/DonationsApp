import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
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
							DonationType: form.data.selectedDonation,
							Date: new Date().toISOString()
						}
					}
				]);

				// Return success with the form and a message
				return message(form, 'Thank you for your donation!');
			} else {
				console.warn('Airtable API key or Base ID is missing');
				// Still return success for testing purposes
				return message(form, 'Donation received (test mode)');
			}
		} catch (error) {
			console.error('Error saving to Airtable:', error);
			// Return a failure with the form and an error message
			return fail(500, {
				form,
				error: 'Failed to process donation. Please try again.'
			});
		}
	}
};
