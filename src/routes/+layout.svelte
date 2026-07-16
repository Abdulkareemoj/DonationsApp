<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { setupViewTransitions } from '$lib/transitions';
	import { navigating } from '$app/state';

	let { children } = $props();

	const isNavigating = $derived(navigating !== null && navigating !== undefined);

	onMount(() => {
		setupViewTransitions();
	});
</script>

<ModeWatcher />
<Header />

<svelte:head>
	<title>DonationsApp - Simple creator donations</title>
	<meta
		name="description"
		content="A lightweight, self-hosted donation page for creators. Accept one-time or monthly contributions via Paystack."
	/>
	<meta property="og:site_name" content="DonationsApp" />
	<meta property="og:title" content="DonationsApp  Simple creator donations" />
	<meta
		property="og:description"
		content="A lightweight, self-hosted donation page for creators. Accept one-time or monthly contributions via Paystack."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/favicon.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="DonationsApp  Simple creator donations" />
	<meta
		name="twitter:description"
		content="A lightweight, self-hosted donation page for creators. Accept one-time or monthly contributions via Paystack."
	/>
	<meta name="twitter:image" content="/favicon.png" />
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
