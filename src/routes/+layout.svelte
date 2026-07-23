<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { setupViewTransitions } from '$lib/transitions';
	import { navigating } from '$app/state';
	import { page } from '$app/state';

	let { children } = $props();

	const isNavigating = $derived(navigating !== null && navigating !== undefined);
	const isEmbedded = $derived(page.url.searchParams.get('embed') === '1');

	onMount(() => {
		setupViewTransitions();
	});
</script>

<ModeWatcher />
{#if !isEmbedded}
	<Header />
{/if}

<svelte:head>
	<meta property="og:site_name" content="DonationsApp" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{#if isNavigating}
	<div class="page-transition-overlay"></div>
{/if}

<div class="page-content" class:navigating={isNavigating}>
	{@render children()}
</div>

<style>
	.page-content {
		view-transition-name: page;
	}

	.page-transition-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.1);
		pointer-events: none;
	}

	:global(.view-transitions-supported) .page-content {
		animation-duration: 0.3s;
	}

	:global(.view-transitions-supported) .navigating {
		animation-duration: 0.3s;
	}
</style>
