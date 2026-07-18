import { ImageResponse } from '@ethercorps/sveltekit-og';
import { GoogleFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import type { RequestHandler } from '@sveltejs/kit';
import OGCard from '$lib/components/og-card.svelte';

const PAGES: Record<string, { title: string; description: string }> = {
	donationspage: {
		title: 'Buy me a coffee.\nFund the next drop.',
		description: 'Support a creator with a one-time or monthly donation via Paystack.'
	},
	donationslist: {
		title: 'Wall of love.\nEvery naira counts.',
		description: 'See who has been supporting the mission.'
	},
	about: {
		title: 'No signups.\nJust code you own.',
		description: 'A lightweight donation page for creators. Accept contributions via Paystack, stored in Airtable.'
	}
};

export const GET: RequestHandler = async ({ url }) => {
	const page = url.searchParams.get('page') ?? 'default';
	const config = PAGES[page] ?? {
		title: 'DonationsApp',
		description: 'A lightweight donation page for creators.'
	};

	const fonts = await resolveFonts([
		new GoogleFont('Inter', { weight: 400, name: 'Inter' }),
		new GoogleFont('Inter', { weight: 700 }),
		new GoogleFont('Inter', { weight: 900 })
	]);

	return new ImageResponse(
		OGCard,
		{
			width: 1200,
			height: 630,
			fonts
		},
		{
			title: config.title,
			description: config.description,
			page
		}
	);
};
