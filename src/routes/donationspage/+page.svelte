<script lang="ts">
  import DonationForm from "./donation-form.svelte";
  import type { PageData } from "./$types.js";
  let { data }: { data: PageData } = $props();

  import Seo from '$lib/components/Seo.svelte'
 </script>
<Seo title="Donate — DonationsApp" description="Make a one-time or monthly donation to support this creator." />

<div>
  <main style="view-transition-name: main-content">
    <section class="w-full py-10 md:py-16 lg:py-20">
      <div class="container px-4 md:px-6">
        <div class="mx-auto max-w-5xl">
          <div class="mb-6 text-center">
            <h1 class="text-3xl font-bold tracking-tight sm:text-4xl" style="view-transition-name: page-title">Make a Donation</h1>
            <p class="mt-2 text-muted-foreground">Support this creator with a one-time or monthly contribution.</p>
          </div>
          <DonationForm {data} />
        </div>
      </div>
    </section>
  </main>
</div>
