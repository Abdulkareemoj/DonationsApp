<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Alert from '$lib/components/ui/alert';
	import * as Empty from '$lib/components/ui/empty';
	import { Button } from '$lib/components/ui/button';
	import Seo from '$lib/components/Seo.svelte';
	import { onMount } from 'svelte';
	import { DollarSign, Users, Clock, MessageSquare, Heart } from '@lucide/svelte';
	import type { Donation } from '../donationspage/+page.server.js';

	let isLoading = $state(true);

	let { data } = $props();
	const errorStr = $derived(String(data?.error ?? '').trim());
	const donationsList: Donation[] = $derived((data?.donations as Donation[]) ?? []);

	const totalRaised = $derived(donationsList.reduce((sum, d) => sum + d.amount, 0));
	const supporterCount = $derived(donationsList.length);
	const latestDonation = $derived(
		donationsList
			.filter((d) => d.date)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
	);

	const cardBg = ['bg-card', 'bg-primary/5', 'bg-secondary/5'];

	onMount(() => {
		const t = setTimeout(() => {
			isLoading = false;
		}, 150);
		return () => clearTimeout(t);
	});

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

<Seo title="Donations List - DonationsApp" description="Browse recent donations and supporters." />

{#if isLoading}
	<section class="w-full py-12 md:py-16">
		<div class=" px-4 md:px-6">
			<div class="mx-auto max-w-5xl">
				<div class="mb-8 flex flex-col items-center gap-3 text-center">
					<Skeleton class="h-3 w-32" />
					<Skeleton class="h-9 w-64" />
					<Skeleton class="h-4 w-48" />
				</div>
				<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
					<Skeleton class="h-24 w-full" />
					<Skeleton class="h-24 w-full" />
					<Skeleton class="h-24 w-full" />
				</div>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each Array(6) as _}
						<Skeleton class="h-36 w-full" />
					{/each}
				</div>
			</div>
		</div>
	</section>
{:else}
	<section class="w-full py-12 md:py-16">
		<div class=" px-4 md:px-6">
			<div class="mx-auto max-w-5xl">
				<div class="mb-12 text-center">
					<span class="eyebrow">Wall of love</span>
					<h1 class="text-display text-ink mt-2" style="view-transition-name: page-title">
						Donations
					</h1>
					<p class="text-body text-muted-foreground mx-auto mt-3 max-w-md">
						Every naira counts. Here's who's been supporting the mission.
					</p>
				</div>

				{#if errorStr.length > 0}
					<Alert.Root variant="destructive" class="brutal-sm">
						<Alert.Title class="text-label">We couldn't load donations.</Alert.Title>
						<Alert.Description class="text-caption">{errorStr}</Alert.Description>
					</Alert.Root>
				{:else if donationsList.length === 0}
					<Empty.Root class="brutal border-2 border-dashed  border-ink/30">
						<Empty.Header>
							<Empty.Media variant="icon">
								<Heart class="size-6" />
							</Empty.Media>
							<Empty.Title class="text-label">No donations yet</Empty.Title>
							<Empty.Description class="text-caption">
								Donations will appear here once they arrive.
							</Empty.Description>
						</Empty.Header>
						<Empty.Content>
							<Button href="/donationspage" variant="outline" class="brutal-sm">
								Go to Donate Page
							</Button>
						</Empty.Content>
					</Empty.Root>
				{:else}
					<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div class="bg-card brutal p-4">
							<div class="flex items-center gap-3">
								<div
									class="bg-primary/20 inline-flex size-10 items-center justify-center rounded-md border-2 border-ink/20"
								>
									<DollarSign class="size-5 text-ink" />
								</div>
								<div>
									<p class="text-caption text-muted-foreground">Total raised</p>
									<p class="text-h2 text-ink">₦{totalRaised.toLocaleString()}</p>
								</div>
							</div>
						</div>
						<div class="bg-card brutal p-4">
							<div class="flex items-center gap-3">
								<div
									class="bg-secondary/10 inline-flex size-10 items-center justify-center rounded-md border-2 border-ink/20"
								>
									<Users class="size-5 text-secondary" />
								</div>
								<div>
									<p class="text-caption text-muted-foreground">Supporters</p>
									<p class="text-h2 text-ink">{supporterCount}</p>
								</div>
							</div>
						</div>
						<div class="bg-card brutal p-4">
							<div class="flex items-center gap-3">
								<div
									class="bg-accent inline-flex size-10 items-center justify-center rounded-md border-2 border-ink/20"
								>
									<Clock class="size-5 text-ink" />
								</div>
								<div>
									<p class="text-caption text-muted-foreground">Latest donation</p>
									<p class="text-body font-bold text-ink">
										{latestDonation ? timeAgo(latestDonation.date) : 'N/A'}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{#each donationsList as donation, i}
							<div class="brutal {cardBg[i % 3]} p-4">
								<div class="mb-3 flex items-center justify-between">
									<div
										class="bg-primary text-ink flex size-9 items-center justify-center rounded-md border-2 border-ink font-bold text-caption"
									>
										{donation.name
											.split(' ')
											.map((n) => n[0])
											.join('')
											.toUpperCase()
											.slice(0, 2)}
									</div>
									<span class="text-h3 text-ink">₦{donation.amount.toLocaleString()}</span>
								</div>

								<h3 class="text-label text-ink">{donation.name || 'Anonymous'}</h3>

								{#if donation.message}
									<div
										class="bg-card border-2 border-ink/10 mt-3 flex items-start gap-2 rounded p-2"
									>
										<MessageSquare class="mt-0.5 size-3 shrink-0 text-muted-foreground" />
										<p class="text-caption text-muted-foreground">{donation.message}</p>
									</div>
								{/if}

								<div class="border-ink/10 mt-3 flex items-center justify-between border-t-2 pt-2">
									<span class="text-caption text-muted-foreground">{timeAgo(donation.date)}</span>
									{#if donation.status}
										<span
											class="bg-accent text-ink inline-flex items-center rounded border-2 border-ink/20 px-1.5 py-0.5 text-caption font-medium"
										>
											{donation.status}
										</span>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}
