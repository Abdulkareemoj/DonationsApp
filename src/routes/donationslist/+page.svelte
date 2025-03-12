<script lang="ts">
  import { onMount } from 'svelte';
  import Airtable from 'airtable';
  import DataTable from './datatable/data-table.svelte';
  import { columns, type Donation } from './datatable/column';
  
  let donations: Donation[] = [];
  let isLoading = true;
  
  onMount(() => {
    const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
    const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
    
    console.log(apiKey);
    console.log(baseId);
    if (!apiKey || !baseId) {
      console.error("Airtable API key or Base ID is undefined");
      isLoading = false;
      return;
    }
    
    const base = new Airtable({ apiKey }).base(baseId);
    
    base("Donors")
      .select({
        // Specify sorting, filtering, and fields if necessary
      })
      .eachPage(
        (records, fetchNextPage) => {
          // Transform Airtable records to our Donation type
          donations = records.map(record => ({
            id: record.id,
            name: typeof record.fields.Name === 'string' ? record.fields.Name : '',
            status: typeof record.fields.Status === 'string' ? record.fields.Status : '',
            price: parseFloat(record.fields.Price) || 0,
            quantity: parseInt(record.fields.Quantity) || 0,
            date: record.fields.Date || '',
            imageUrl: record.fields.Image?.[0]?.url || '/placeholder.svg'
          }));
          
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
  <div class="flex justify-center items-center p-8">Loading...</div>
{:else}
  <div class="container mx-auto py-10">
    <h1 class="text-2xl font-bold mb-4">Donations</h1>
    <DataTable data={donations} columns={columns} />
  </div>
{/if}