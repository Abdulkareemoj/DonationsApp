<script lang="ts" module>
	export const navLinks = [
		{ label: "Features", href: "#" },
		{ label: "Pricing", href: "#" },
		{ label: "About", href: "#" }
	];
</script>

<script lang="ts">
	import { cn } from "$lib/utils";
	import Logo from "$lib/components/Logo.svelte";
	import { useScroll } from "$lib/hooks/useScroll.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import MobileNav from "$lib/components/MobileNav.svelte";

	const scroll = useScroll(10);
</script>

<header
	class={cn(
		"sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
		{
			"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
				scroll.scrolled
		}
	)}
>
	<nav
		class={cn(
			"flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
			{ "md:px-2": scroll.scrolled }
		)}
	>
		<a class="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50" href="#">
			<Logo class="h-4" />
		</a>

		<div class="hidden items-center gap-2 md:flex">
			<div>
				{#each navLinks as link (link.label)}
					<a href={link.href} class={buttonVariants({ size: "sm", variant: "ghost" })}>
						{link.label}
					</a>
				{/each}
			</div>
			<a href="#" class={buttonVariants({ size: "sm", variant: "outline" })}>Sign In</a>
			<a href="#" class={buttonVariants({ size: "sm" })}>Get Started</a>
		</div>

		<MobileNav {navLinks} />
	</nav>
</header>
