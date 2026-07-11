<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	let {
		class: className = "",
		children,
		...rest
	}: { class?: string; children?: Snippet; [key: string]: unknown } = $props();

	// Svelte actions run client-side only after mount, and clean up via `destroy()`
	// on unmount — this replaces React's createPortal + useEffect combo.
	function portal(node: HTMLElement) {
		const originalStyle = window.getComputedStyle(document.body).overflow;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const originalPaddingRight = document.body.style.paddingRight;

		document.body.style.overflow = "hidden";
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}
		document.body.appendChild(node);

		return {
			destroy() {
				document.body.style.overflow = originalStyle;
				document.body.style.paddingRight = originalPaddingRight;
				node.remove();
			}
		};
	}
</script>

<div use:portal class={cn("fixed inset-0 isolate z-40 flex flex-col", className)} {...rest}>
	{@render children?.()}
</div>
