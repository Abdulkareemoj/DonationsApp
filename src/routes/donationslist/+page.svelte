<script lang="ts">
	import DataTable from './data-table.svelte';
	import { columns, type Donation } from './column';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Alert from '$lib/components/ui/alert';
	import * as Empty from '$lib/components/ui/empty';
	import Seo from '$lib/components/Seo.svelte';
	import { onMount } from 'svelte';

	let isLoading = $state(true);

	let { data } = $props();
	const errorStr = $derived(String(data?.error ?? '').trim());
	const donationsList: Donation[] = $derived((data?.donations as Donation[]) ?? []);

	onMount(() => {
		const t = setTimeout(() => {
			isLoading = false;
		}, 150);
		return () => clearTimeout(t);
	});
</script>

<Seo title="Donations List — DonationsApp" description="Browse recent donations and supporters." />

{#if isLoading}
	<section class="w-full py-10 md:py-16">
		<div class="container px-4 md:px-6">
			<div class="mx-auto max-w-6xl">
				<div class="mb-8 flex flex-col items-center gap-3 text-center">
					<Skeleton class="h-7 w-40" />
					<Skeleton class="h-4 w-56" />
				</div>
				<div class="bg-card rounded-2xl border p-4 shadow-sm">
					<Skeleton class="mb-4 h-10 w-64" />
					<div class="flex flex-col gap-3">
						<Skeleton class="h-12 w-full" />
						<Skeleton class="h-12 w-full" />
						<Skeleton class="h-12 w-full" />
						<Skeleton class="h-12 w-full" />
						<Skeleton class="h-12 w-full" />
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<section class="w-full py-10 md:py-16">
		<div class="container px-4 md:px-6">
			<div class="mx-auto max-w-6xl">
				<div class="mb-8 text-center">
					<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Donations</h1>
					<p class="text-muted-foreground mt-2 text-base">Recent contributions and supporters.</p>
				</div>
				{#if errorStr.length > 0}
					<Alert.Root variant="destructive">
						<Alert.Title>We couldn't load donations.</Alert.Title>
						<Alert.Description>{errorStr}</Alert.Description>
					</Alert.Root>
				{:else if donationsList.length === 0}
					<Empty.Root>
						<Empty.EmptyHeader>
							<Empty.EmptyTitle>No donations yet</Empty.EmptyTitle>
							<Empty.EmptyDescription
								>Donations will appear here once they arrive.</Empty.EmptyDescription
							>
						</Empty.EmptyHeader>
					</Empty.Root>
				{:else}
					<div class="bg-card rounded-2xl border p-4 shadow-sm">
						<DataTable data={donationsList} {columns} />
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}
