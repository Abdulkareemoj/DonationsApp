<script lang="ts">
	import { CreditCard, RefreshCw, Heart } from '@lucide/svelte';

	const perks = [
		{
			icon: CreditCard,
			title: 'One-time or monthly',
			description: 'Choose how you want to support, once or every month.'
		},
		{
			icon: RefreshCw,
			title: 'Instant checkout',
			description: 'Fast, secure payment via Paystack. No account needed.'
		},
		{
			icon: Heart,
			title: '100% goes to creator',
			description: 'No hidden fees. Every naira goes directly to the creator.'
		}
	];
</script>

<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
	{#each perks as perk}
		<div class="bg-card brutal-sm flex items-start gap-3 p-4">
			<div class="bg-primary/20 mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded border-2 border-ink/20">
				<perk.icon class="size-4 text-ink" />
			</div>
			<div>
				<h4 class="text-label text-ink">{perk.title}</h4>
				<p class="text-caption text-muted-foreground mt-1">{perk.description}</p>
			</div>
		</div>
	{/each}
</div>
