<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		goto('/donationspage', { replaceState: true });
	});
</script>

<main class="bg-background text-foreground flex min-h-screen items-center justify-center">
	<p class="text-muted-foreground text-sm">Redirecting…</p>
</main>
