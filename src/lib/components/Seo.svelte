<script lang="ts">
	import { page } from '$app/state';

	export let title: string = 'DonationsApp — Support creators you love';
	export let description: string =
		'A simple way to support your favorite creators with one-time or monthly donations.';
	export let image: string = '';
	export let type: string = 'website';
	export let siteName: string = 'DonationsApp';
	export let pageName: string = 'home'; // New prop to identify the page

	// Generate OG image URL if not provided
	$: ogImageUrl =
		image ||
		`${page.url.origin}/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&page=${pageName}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>
