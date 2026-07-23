import { error, json, type RequestHandler } from '@sveltejs/kit';
import { verifyAndSave } from '$lib/server/donations';

export const POST: RequestHandler = async ({ request }) => {
	const { reference } = (await request.json()) as { reference?: unknown };
	if (typeof reference !== 'string') throw error(400, 'A payment reference is required.');

	try {
		const donation = await verifyAndSave(reference);
		return json({ donation });
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Payment verification failed.';
		throw error(400, message);
	}
};
