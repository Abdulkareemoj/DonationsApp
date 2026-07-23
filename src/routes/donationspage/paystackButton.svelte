<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Spinner } from '$lib/components/ui/spinner';

	let {
		name,
		email,
		message = '',
		amount,
		donationType = 'one-time',
		onError
	}: {
		name: string;
		email: string;
		message?: string;
		amount: number;
		donationType?: 'one-time' | 'monthly';
		onError: (message: string) => void;
	} = $props();

	let loading = $state(false);

	async function beginCheckout() {
		loading = true;
		onError('');

		try {
			const response = await fetch('/api/payments/initialize', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, donationEmail: email, message, amount, selectedDonation: donationType })
			});
			const result = (await response.json()) as { authorizationUrl?: string; message?: string };
			if (!response.ok || !result.authorizationUrl) {
				throw new Error(result.message || 'Unable to start checkout. Please try again.');
			}

			window.location.assign(result.authorizationUrl);
		} catch (error) {
			onError(error instanceof Error ? error.message : 'Unable to start checkout. Please try again.');
			loading = false;
		}
	}
</script>

<Button
	type="button"
	onclick={beginCheckout}
	disabled={loading}
	class="brutal-press w-full bg-primary text-ink text-body font-bold border-2 border-ink hover:bg-primary/90"
>
	{#if loading}
		<Spinner data-icon="inline-start" />
		Preparing secure checkout…
	{:else}
		Donate securely with Paystack
	{/if}
</Button>
