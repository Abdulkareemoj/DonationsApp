<script>
  import { onMount } from 'svelte';
  import Airtable from 'airtable';
  import { MoreHorizontal } from 'lucide-svelte';
  
  // Import shadcn-svelte components
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger 
  } from '$lib/components/ui/dropdown-menu';
  import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow 
  } from '$lib/components/ui/table';
  
  let records = [];
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
  <Table>
    <TableBody>
      {#each records as record (record.id)}
        <TableRow>
          <TableCell class="hidden sm:table-cell">
            <img
              alt="Product image"
              class="aspect-square rounded-md object-cover h-16 w-16"
              src={record.fields.Image[0].url || "/placeholder.svg"}
            />
          </TableCell>
          <TableCell class="font-medium">{record.fields.Name}</TableCell>
          <TableCell>
            <Badge variant="outline">{record.fields.Status}</Badge>
          </TableCell>
          <TableCell class="hidden md:table-cell">
            {record.fields.Price}
          </TableCell>
          <TableCell class="hidden md:table-cell">
            {record.fields.Quantity}
          </TableCell>
          <TableCell class="hidden md:table-cell">
            {record.fields.Date}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" class="h-8 w-8 p-0">
                  <span class="sr-only">Open menu</span>
                  <MoreHorizontal class="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
{/if}