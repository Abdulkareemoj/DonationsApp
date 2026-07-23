import { env } from '$env/dynamic/private';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { donationSchema } from '../../../donationspage/schema';

type PaystackInitialization = {
	status: boolean;
	message: string;
	data?: { authorization_url: string; reference: string };
};

export const POST: RequestHandler = async ({ request, url }) => {
	if (!env.PAYSTACK_SECRET_KEY) {
		throw error(503, 'Payments are not configured yet.');
	}

	const input = donationSchema.safeParse(await request.json());
	if (!input.success || !input.data.amount) {
		throw error(400, 'Enter a valid donation amount.');
	}
	const response = await fetch('https://api.paystack.co/transaction/initialize', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: input.data.donationEmail,
			amount: input.data.amount * 100,
			currency: 'NGN',
			callback_url: `${url.origin}/donationspage`,
			metadata: {
				donation_name: input.data.name.trim(),
				donation_message: input.data.message?.trim() || ''
			}
		})
	});

	const result = (await response.json()) as PaystackInitialization;
	if (!response.ok || !result.status || !result.data) {
		console.error('Paystack initialization failed', result.message);
		throw error(502, 'Unable to start checkout. Please try again.');
	}

	return json({ authorizationUrl: result.data.authorization_url });
};
