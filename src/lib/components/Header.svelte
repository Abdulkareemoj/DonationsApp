<script lang="ts" module>
	export const navLinks = [
		{ label: "Donate", href: "/donationspage" },
		{ label: "Donations", href: "/donationslist" },
		{ label: "About", href: "/about" }
	];
</script>

<script lang="ts">
	import ModeToggle from "./modeToggle.svelte";
	import { cn } from "$lib/utils";
	import Logo from "$lib/components/Logo.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import MobileNav from "$lib/components/MobileNav.svelte";
</script>

<header
	class="sticky top-0 z-50 mx-auto w-full max-w-5xl border-b-2 border-ink bg-surface md:top-2 md:rounded-lg md:border-2 md:shadow-brutal"
>
	<nav class="flex h-14 w-full items-center justify-between px-4 md:h-14">
		<a class="rounded p-2 hover:bg-muted transition-colors" href="/">
			<Logo class="h-4" />
		</a>

		<div class="hidden items-center gap-1 md:flex">
			{#each navLinks as link (link.label)}
				<a
					href={link.href}
					class="text-label hover:bg-muted rounded px-3 py-1.5 text-ink transition-colors"
				>
					{link.label}
				</a>
			{/each}
			<ModeToggle />
		</div>

		<MobileNav {navLinks} />
	</nav>
</header>
