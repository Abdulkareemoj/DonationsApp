<script lang="ts">
	import { Target } from '@lucide/svelte';

	export let goalAmount: number;
	export let goalLabel: string;
	export let currentAmount: number = 0;

	$: progress = Math.min((currentAmount / goalAmount) * 100, 100);
	$: formattedCurrent = currentAmount.toLocaleString();
	$: formattedGoal = goalAmount.toLocaleString();
</script>
<div class="brutal rounded-md bg-card p-6">
  <div class="flex items-center gap-2">
    <Target class="size-4" strokeWidth={3} />
    <div class="eyebrow">Current goal</div>
  </div>
  <h3 class="mt-2 text-lg font-black leading-tight">{goalLabel}</h3>

  <div class="brutal-sm mt-4 h-6 overflow-hidden rounded-sm bg-background">
    <div
      class="h-full bg-primary transition-[width] duration-500"
      style={{ width: `${progress}%` }}
    />
  </div>
  <div class="mt-2 flex items-baseline justify-between">
    <div class="font-mono text-sm font-bold">
      ₦{formattedCurrent} <span class="text-foreground/60">/ ₦{goalAmount.toLocaleString()}</span>
    </div>
    <div class="font-mono text-sm font-black">{progress}%</div>
  </div>
</div>
