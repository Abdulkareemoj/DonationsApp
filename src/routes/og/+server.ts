// src/routes/og/+server.ts
import { ImageResponse } from '@ethercorps/sveltekit-og';
import OgCard from '$lib/components/og-card.svelte';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title') ?? 'DonationsApp';
	const description = url.searchParams.get('description') ?? 'Support creators you love';
	const page = url.searchParams.get('page') ?? 'home';

	return new ImageResponse(
		OgCard,
		{
			width: 1200,
			height: 630
		},
		// Props passed to the component (this is the 3rd parameter in v4)
		{
			title,
			description,
			page
		}
	);
};
