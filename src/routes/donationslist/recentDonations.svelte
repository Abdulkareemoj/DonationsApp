<script lang="ts">
	import type { Donation } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';
	import * as Table from '$lib/components/ui/table';

	let { donations = [] }: { donations?: Donation[] } = $props();
</script>

<Table.Root>
	<Table.Body>
		{#each donations as donation (donation.id)}
			<Table.Row>
				<Table.Cell class="font-medium">{donation.name}</Table.Cell>
				<Table.Cell>
					<Badge variant="outline">{donation.status}</Badge>
				</Table.Cell>
				<Table.Cell class="hidden md:table-cell">₦{donation.amount.toLocaleString()}</Table.Cell>
				<Table.Cell class="hidden md:table-cell">{new Date(donation.date).toLocaleDateString()}</Table.Cell>
			</Table.Row>
		{:else}
			<Table.Row>
				<Table.Cell colspan={4} class="h-24 text-center text-muted-foreground">
					No donations yet.
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
