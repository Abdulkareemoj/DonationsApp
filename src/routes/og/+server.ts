import { ImageResponse } from '@ethercorps/sveltekit-og';
import { GoogleFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import OGCard from '$lib/components/og-card.svelte';
import type { RequestHandler } from '@sveltejs/kit';

const PAGES: Record<string, { title: string; description: string; label: string; accent: string }> = {
	donationspage: {
		title: 'Buy me a coffee.\nFund the next drop.',
		description: 'Support a creator with a one-time or monthly donation via Paystack.',
		label: 'Donate',
		accent: '#fdc800'
	},
	donationslist: {
		title: 'Wall of love.\nEvery naira counts.',
		description: 'See who has been supporting the mission.',
		label: 'Supporters',
		accent: '#432dd7'
	},
	about: {
		title: 'No signups.\nJust code you own.',
		description: 'A lightweight donation page for creators.',
		label: 'About',
		accent: '#e8ffe0'
	}
};

const WIDTH = 1200;
const HEIGHT = 630;

// GoogleFont handles the CSS fetch, URL parsing, and format negotiation
// internally — no more hand-rolled User-Agent tricks or WOFF2 fallout.
const FONTS = [
	new GoogleFont('Inter', { weight: 400 }),
	new GoogleFont('Inter', { weight: 700 }),
	new GoogleFont('Inter', { weight: 900 })
];

export const GET: RequestHandler = async ({ url }) => {
	try {
		const page = url.searchParams.get('page') ?? 'default';
		const p = PAGES[page] ?? {
			title: 'DonationsApp',
			description: 'A lightweight donation page for creators.',
			label: 'DonationsApp',
			accent: '#fdc800'
		};

		return new ImageResponse(
			// 1. Component
			OGCard,
			// 2. Options
			{
				width: WIDTH,
				height: HEIGHT,
				fonts: await resolveFonts(FONTS),
				headers: {
					'cache-control': 'public, max-age=86400, s-maxage=86400'
				}
			},
			// 3. Component props
			p
		);
	} catch (e) {
		console.error('OG generation failed:', e);
		return new Response('OG generation failed', { status: 500 });
	}
 };
