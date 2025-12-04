<script lang="ts">
	import DataTable from './data-table.svelte';
	import { columns, type Donation } from './column';

	let isLoading = $state(true);

	let { data } = $props();
	const errorStr = $derived(String(data?.error ?? '').trim());
	const donationsList: Donation[] = $derived((data?.donations as Donation[]) ?? []);

	import { onMount } from 'svelte';
	onMount(() => {
		const t = setTimeout(() => {
			isLoading = false;
		}, 150);
		return () => clearTimeout(t);
	});

	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Donations List — DonationsApp"
	description="Browse recent donations and supporters."
	pageName="donations"
/>

{#if isLoading}
	<section class="w-full py-10 md:py-16">
		<div class="container px-4 md:px-6">
			<div class="mx-auto max-w-6xl">
				<div class="mb-6 text-center">
					<div class="bg-muted mx-auto h-6 w-40 animate-pulse rounded-md"></div>
					<div class="bg-muted mx-auto mt-2 h-4 w-64 animate-pulse rounded-md"></div>
				</div>
				<div class="bg-card rounded-2xl border p-4 shadow-sm">
					<div class="bg-muted mb-3 h-8 w-56 animate-pulse rounded-md"></div>
					<div class="grid gap-3">
						<div class="bg-muted h-10 w-full animate-pulse rounded-md"></div>
						<div class="bg-muted h-10 w-full animate-pulse rounded-md"></div>
						<div class="bg-muted h-10 w-full animate-pulse rounded-md"></div>
						<div class="bg-muted h-10 w-full animate-pulse rounded-md"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<section class="w-full py-10 md:py-16">
		<div class="container px-4 md:px-6">
			<div class="mx-auto max-w-6xl">
				<div class="mb-6 text-center">
					<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Donations</h1>
					<p class="text-muted-foreground mt-2">Recent contributions and supporters.</p>
				</div>
				{#if errorStr.length > 0}
					<div class="bg-destructive/10 text-destructive rounded-2xl border p-6">
						<div class="font-semibold">We couldn’t load donations.</div>
						<div class="text-sm opacity-90">{errorStr}</div>
					</div>
				{:else if donationsList.length === 0}
					<div class="bg-card text-muted-foreground rounded-2xl border p-10 text-center">
						<div class="text-lg font-medium">No donations yet</div>
						<div class="mt-1 text-sm">Donations will appear here once they arrive.</div>
					</div>
				{:else}
					<div class="bg-card rounded-2xl border p-4 shadow-sm">
						<DataTable data={donationsList} {columns} />
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}
