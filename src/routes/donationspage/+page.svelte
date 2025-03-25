<script lang="ts">
  import DonationForm from "./donation-form.svelte";
  import type { PageData } from "./$types.js";
  let { data }: { data: PageData } = $props();

  console.log('Page Data:', data); // Add this line
</script>

<div>
  <main style="view-transition-name: main-content">
    <div class="mx-auto p-10" style="view-transition-name: donation-form-container">
      <h1 class="text-3xl font-bold mb-6" style="view-transition-name: page-title">Make a Donation</h1>
      <DonationForm {data} />
    </div>
  </main>
</div>
