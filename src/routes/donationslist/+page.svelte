<script lang="ts">
  import DataTable from './data-table.svelte';
  import { columns, type Donation } from './column';

  let isLoading = true;

 let { data } = $props();
</script>

{#if isLoading}
  <div class="flex justify-center items-center p-8">Loading...</div>
{:else}
  <div class="container mx-auto py-10">
    <h1 class="text-2xl font-bold mb-4">Donations</h1>
    <DataTable {data} {columns} />
  </div>
{/if}