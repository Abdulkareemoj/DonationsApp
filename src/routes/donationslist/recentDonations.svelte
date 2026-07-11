<script lang="ts">
	import { onMount } from 'svelte';
	import Airtable from 'airtable';
	import { MoreHorizontal } from '@lucide/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Table from '$lib/components/ui/table';

	let records: any[] = $state([]);
	let isLoading = $state(true);

	onMount(() => {
		const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
		const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

		if (!apiKey || !baseId) {
			console.error('Airtable API key or Base ID is undefined');
			isLoading = false;
			return;
		}

		const base = new Airtable({ apiKey }).base(baseId);

		base('Donors')
			.select({})
			.eachPage(
				(fetchedRecords, fetchNextPage) => {
					records = fetchedRecords;
					fetchNextPage();
				},
				(err) => {
					if (err) {
						console.error(err);
						return;
					}
					isLoading = false;
				}
			);
	});
</script>

{#if isLoading}
	<div>Loading...</div>
{:else}
	<Table.Root>
		<Table.Body>
			{#each records as record (record.id)}
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product image"
							class="aspect-square rounded-md object-cover size-16"
							src={record.fields.Image[0].url || '/placeholder.svg'}
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">{record.fields.Name}</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">{record.fields.Status}</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">
						{record.fields.Price}
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">
						{record.fields.Quantity}
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">
						{record.fields.Date}
					</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								{#snippet child({ props })}
									<Button {...props} variant="ghost" size="icon" class="size-8 p-0">
										<span class="sr-only">Open menu</span>
										<MoreHorizontal />
									</Button>
								{/snippet}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Group>
									<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
									<DropdownMenu.Item>View details</DropdownMenu.Item>
									<DropdownMenu.Item>Edit</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/if}
