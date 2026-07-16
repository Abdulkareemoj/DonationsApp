<script lang="ts">
	import { cn } from "$lib/utils";
	import Portal from "$lib/components/portal.svelte";
	import PortalBackdrop from "$lib/components/portal-backdrop.svelte";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import {Menu, X} from "@lucide/svelte";
	let { navLinks }: { navLinks: { label: string; href: string }[] } = $props();
	let open = $state(false);
	import ModeToggle from "./modeToggle.svelte";
</script>

<div class="md:hidden">
	<Button
		aria-controls="mobile-menu"
		aria-expanded={open}
		aria-label="Toggle menu"
		class="md:hidden"
		onclick={() => (open = !open)}
		size="icon"
		variant="outline"
	>
		{#if open}
			<X class="size-4.5" />
		{:else}
			<Menu class="size-4.5" />
		{/if}
	</Button>

	{#if open}
		<Portal id="mobile-menu" class="top-14">
			<PortalBackdrop {open} />
			<div class={cn("zoom-in-97 ease-out animate-in", "size-full p-4")} data-slot="open">
				<div class="grid gap-y-2">
					{#each navLinks as link (link.label)}
						<a
							href={link.href}
							class={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
						>
							{link.label}
						</a>
					{/each}
				</div>
				<ModeToggle/>
			</div>
		</Portal>
	{/if}
</div>
