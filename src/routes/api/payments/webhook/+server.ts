import { env } from '$env/dynamic/private';
import { error, type RequestHandler } from '@sveltejs/kit';
import { createHash, timingSafeEqual } from 'node:crypto';
import { verifyAndSave } from '$lib/server/donations';

export const POST: RequestHandler = async ({ request }) => {
	if (!env.PAYSTACK_SECRET_KEY) throw error(503, 'Payments are not configured yet.');
	const rawBody = await request.text();
	const signature = request.headers.get('x-paystack-signature');
	const expected = createHash('sha512').update(rawBody).update(env.PAYSTACK_SECRET_KEY).digest('hex');
	if (!signature || signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
		throw error(401, 'Invalid webhook signature.');
	}

	const event = JSON.parse(rawBody) as { event?: string; data?: { reference?: string } };
	if (event.event === 'charge.success' && typeof event.data?.reference === 'string') {
		await verifyAndSave(event.data.reference);
	}

	return new Response(null, { status: 200 });
};
