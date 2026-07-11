<script lang="ts">
	import { cn } from "$lib/utils";

	let { class: className = "", open = true }: { class?: string; open?: boolean } = $props();
</script>

<div
	data-state={open ? "open" : "closed"}
	class={cn(
		"fixed inset-0 -z-1 bg-background/95 backdrop-blur-sm duration-500",
		"data-[state=closed]:fade-out-0 data-[state=closed]:animate-out",
		"data-[state=open]:fade-in-0 data-[state=open]:animate-in",
		"supports-backdrop-filter:bg-background/60",
		className
	)}
></div>
