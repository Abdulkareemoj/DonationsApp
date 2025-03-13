<script lang="ts">
  import { MoreHorizontal } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  
  let { id }: { id: string } = $props();
  
  function copyId() {
    navigator.clipboard.writeText(id);
  }
  
  function viewDetails() {
    console.log(`View details for donation ${id}`);
  }
  
  function editDonation() {
    console.log(`Edit donation ${id}`);
  }
  
  function deleteDonation() {
    console.log(`Delete donation ${id}`);
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="ghost"
        size="icon"
        class="relative size-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
      <DropdownMenu.Item onclick={copyId}>
        Copy donation ID
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onclick={viewDetails}>View details</DropdownMenu.Item>
    <DropdownMenu.Item onclick={editDonation}>Edit donation</DropdownMenu.Item>
    <DropdownMenu.Item onclick={deleteDonation} class="text-red-600">
      Delete donation
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>