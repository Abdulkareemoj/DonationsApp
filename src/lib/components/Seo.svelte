<script lang="ts">
	import { page } from '$app/state';

	let {
		title = 'DonationsApp — Support creators you love',
		description = 'A simple way to support your favorite creators with one-time or monthly donations.',
		type = 'website',
		siteName = 'DonationsApp'
	} = $props();

	// Always use the /og endpoint for the image
	let ogImageUrl = $derived(`${page.url.origin}/og`);
	let currentUrl = $derived(page.url.href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:url" content={currentUrl} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>
