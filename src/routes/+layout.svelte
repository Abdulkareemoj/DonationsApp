<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from "mode-watcher";
  import Header from "$lib/components/header.svelte";
  import { onMount } from 'svelte';
  import { setupViewTransitions } from '$lib/transitions';
  import { navigating } from '$app/state'; // For Svelte 5
  
  let { children } = $props();
  
  // Create a derived value using the new runes syntax
  const isNavigating = $derived(navigating !== null && navigating !== undefined);
  
  // Set up view transitions on mount
  onMount(() => {
    setupViewTransitions();
  });
</script>

<ModeWatcher />
<Header />

<!-- Only show overlay when navigating -->
{#if isNavigating}
  <div class="page-transition-overlay" ></div>
{/if}

<div class="page-content" class:navigating={isNavigating}>
  {@render children()}
</div>

<style>
  .page-content {
    view-transition-name: page;
  }
  
  .page-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 100;
    pointer-events: none;
  }
  
  /* Apply styles when view transitions are supported */
  :global(.view-transitions-supported) .page-content {
    animation-duration: 0.3s;
  }
  
  :global(.view-transitions-supported) .navigating {
    animation-duration: 0.3s;
  }
</style>