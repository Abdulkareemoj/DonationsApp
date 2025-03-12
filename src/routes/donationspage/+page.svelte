<script lang="ts">
import DonationForm from "./donation-form.svelte";
  import type { PageData } from "./$types.js";
  let { data }: { data: PageData } = $props();
</script>
    <div>
      <main>
        
        <div class="mx-auto p-10"><DonationForm  {data}/>
        </div>
      </main>
    </div>
