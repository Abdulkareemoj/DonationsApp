<script lang="ts" module>
	export const navLinks = [
		{ label: "Donate", href: "/donationspage" },
		{ label: "Donations", href: "/donationslist" },
		{ label: "About", href: "/about" }
	];
</script>

<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { createScroll } from "$lib/hooks/useScroll.svelte";
	import Logo from "$lib/components/Logo.svelte";

	import { Portal, PortalBackdrop } from "$lib/components/ui/portal";
	import { cn } from "$lib/utils";
	import { MenuIcon, XIcon } from "@lucide/svelte";
	import ModeToggle from "$lib/components/modeToggle.svelte"

	let open = $state(false);
	let scroll = createScroll(10);
</script>

<header
	class={cn(
		"sticky top-0 z-50 mx-auto w-full max-w-4xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out",
		scroll.scrolled &&
			"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow"
	)}
>
	<nav
		class={cn(
			"flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
			scroll.scrolled && "md:px-2"
		)}
	>
		<a class="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50" href="/">
			<Logo class="h-4" />
		</a>
		<div class="hidden items-center gap-2 md:flex">
			<div>
				{#each navLinks as { label, href }}
					<Button size="sm" variant="ghost" {href}>
						{label}
					</Button>
				{/each}
			</div>
			<ModeToggle/>
		</div>
		<div class="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				class="md:hidden"
				size="icon"
				variant="outline"
				onclick={() => (open = !open)}
			>
				{#if open}
					<XIcon class="size-4.5" />
				{:else}
					<MenuIcon class="size-4.5" />
				{/if}
			</Button>
			{#if open}
				<Portal class="top-14">
					<PortalBackdrop />
					<div
						class={cn(
							"ease-out data-[slot=open]:animate-in data-[slot=open]:zoom-in-97",
							"size-full p-4"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div class="grid gap-y-2">
							{#each navLinks as link, i}
								<Button class="justify-start" variant="ghost" href={link.href}>
									{link.label}
								</Button>
							{/each}
						</div>
						<div class="mt-12 flex flex-col gap-2">
						<ModeToggle/>
						</div>
					</div>
				</Portal>
			{/if}
		</div>
	</nav>
</header>
