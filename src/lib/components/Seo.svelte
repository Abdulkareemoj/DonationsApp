<script lang="ts">
	import { page } from '$app/stores';

	export let title: string = 'DonationsApp — Support creators you love';
	export let description: string =
		'A simple way to support your favorite creators with one-time or monthly donations.';
	export let type: string = 'website';
	export let siteName: string = 'DonationsApp';

	// Always use the /og endpoint for the image
	$: ogImageUrl = `${$page.url.origin}/og`;
	$: currentUrl = $page.url.href;
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
