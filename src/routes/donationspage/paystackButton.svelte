<!-- Inspiration from https://gist.github.com/struckchure/c99a975e9630a138eab522acf7579cda -->

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	export let email: string;
	export let amount: number; // in kobo (multiply by 100 for Naira)
	export let reference: string = new Date().getTime().toString();
	export let publicKey: string;
	export let text: string = 'Pay with Paystack';
	export let metadata: Record<string, any> = {};

	let isClient = false;
	let PaystackPop: any;

	onMount(() => {
		isClient = true;
		// Load Paystack script
		const script = document.createElement('script');
		script.src = 'https://js.paystack.co/v1/inline.js';
		script.async = true;
		script.onload = () => {
			PaystackPop = window.PaystackPop;
		};
		document.body.appendChild(script);
	});

	function initializePayment() {
		if (!PaystackPop) {
			console.error('Paystack not loaded');
			return;
		}

		const handler = PaystackPop.setup({
			key: publicKey,
			email,
			amount: amount * 100, // Convert amount to kobo
			ref: reference,
			metadata,
			callback: function (response: any) {
				const event = new CustomEvent('payment:success', {
					detail: { reference: response.reference }
				});
				document.dispatchEvent(event);
			},
			onClose: function () {
				const event = new CustomEvent('payment:close');
				document.dispatchEvent(event);
			}
		});

		handler.openIframe();
	}
</script>

<Button onclick={initializePayment} variant="secondary" disabled={!isClient || !PaystackPop}>
	{text}
</Button>

<svelte:head>
	{#if isClient}
		<script>
			// TypeScript declaration for PaystackPop
			interface Window {
				PaystackPop: any;
			}
		</script>
	{/if}
</svelte:head>
