<script lang="ts">
  import DataTable from './data-table.svelte';
  import { columns, type Donation } from './column';

  let isLoading = true;

 let { data } = $props();
 const errorStr = $derived(String(data?.error ?? '').trim());
 const donationsList: Donation[] = $derived((data?.donations as Donation[]) ?? []);

 import { onMount } from 'svelte';
 onMount(() => {
   const t = setTimeout(() => { isLoading = false; }, 150);
   return () => clearTimeout(t);
 });

  import Seo from '$lib/components/Seo.svelte'
 </script>
<Seo title="Donations List — DonationsApp" description="Browse recent donations and supporters." />

{#if isLoading}
  <section class="w-full py-10 md:py-16">
    <div class="container px-4 md:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="mb-6 text-center">
          <div class="mx-auto h-6 w-40 animate-pulse rounded-md bg-muted"></div>
          <div class="mx-auto mt-2 h-4 w-64 animate-pulse rounded-md bg-muted"></div>
        </div>
        <div class="rounded-2xl border bg-card p-4 shadow-sm">
          <div class="mb-3 h-8 w-56 animate-pulse rounded-md bg-muted"></div>
          <div class="grid gap-3">
            <div class="h-10 w-full animate-pulse rounded-md bg-muted"></div>
            <div class="h-10 w-full animate-pulse rounded-md bg-muted"></div>
            <div class="h-10 w-full animate-pulse rounded-md bg-muted"></div>
            <div class="h-10 w-full animate-pulse rounded-md bg-muted"></div>
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
          <p class="mt-2 text-muted-foreground">Recent contributions and supporters.</p>
        </div>
        {#if errorStr.length > 0}
          <div class="rounded-2xl border bg-destructive/10 p-6 text-destructive">
            <div class="font-semibold">We couldn’t load donations.</div>
            <div class="text-sm opacity-90">{errorStr}</div>
          </div>
        {:else if donationsList.length === 0}
          <div class="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            <div class="text-lg font-medium">No donations yet</div>
            <div class="mt-1 text-sm">Donations will appear here once they arrive.</div>
          </div>
        {:else}
          <div class="rounded-2xl border bg-card p-4 shadow-sm">
            <DataTable data={donationsList} {columns} />
          </div>
        {/if}
      </div>
    </div>
  </section>
{/if}
