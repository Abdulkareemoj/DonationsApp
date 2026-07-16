<script lang="ts">
	import type { Donation } from '$lib/types';
	import { Heart } from '@lucide/svelte';

	export let donations: Donation[] = [];

	$: recent = donations
		.filter((d) => d.amount > 0)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);

	function timeAgo(dateStr: string): string {
		const now = new Date();
		const date = new Date(dateStr);
		const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

		if (seconds < 60) return 'just now';
		if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
		if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
		if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
		return date.toLocaleDateString();
	}
</script>

<div class="bg-card brutal p-5">
	<div class="mb-3 flex items-center gap-2">
		<div class="bg-secondary/10 inline-flex size-8 items-center justify-center rounded border-2 border-ink/20">
			<Heart class="size-4 text-secondary" />
		</div>
		<h3 class="text-label text-ink">Recent Supporters</h3>
	</div>

	{#if recent.length === 0}
		<p class="text-caption text-muted-foreground py-4 text-center">No donations yet. Be the first!</p>
	{:else}
		<ul class="flex flex-col gap-2">
			{#each recent as donation}
				<li class="flex items-center justify-between">
					<div class="flex items-center gap-2 min-w-0">
						<span class="text-body font-medium text-ink truncate">{donation.name || 'Anonymous'}</span>
					</div>
					<div class="flex items-center gap-2 shrink-0">
						<span class="text-caption text-muted-foreground">{timeAgo(donation.date)}</span>
						<span class="text-body font-bold text-ink">₦{donation.amount}</span>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
