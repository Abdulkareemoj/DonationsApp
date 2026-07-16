<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		children,
		...props
	}: { children: Snippet } & HTMLAttributes<HTMLElement> = $props();
</script>

<code
	class="mr-1 inline-block rounded-[--radius-sm] border-2 border-ink bg-background px-1.5 py-0.5 font-mono text-[11px] font-bold shadow-[2px_2px_0_0_var(--ink)]"
	{...props}
>
	{@render children?.()}
</code>
