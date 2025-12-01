<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';
	import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet';
	import ModeToggle from './modeToggle.svelte';
	import { Menu, Package2, Search } from 'lucide-svelte';
	import { navigateWithTransition } from '$lib/hooks/useViewTransition';

	let isOpen = false;
	function handleNavigation(url: string, event: MouseEvent) {
		event.preventDefault();
		navigateWithTransition(url);
	}
</script>

<header class="sticky top-0 z-50 w-full">
	<div
		class="bg-background/60 supports-backdrop-filter:bg-background/50 mx-auto flex h-16 items-center justify-between gap-4 border-b px-4 backdrop-blur md:px-6"
	>
		<!-- Left spacer for centering on desktop -->
		<a
			href="/"
			on:click={(e) => handleNavigation('/', e)}
			class="hover:bg-accent/50 flex items-center gap-2 rounded-md px-2 py-1 transition-colors"
			style="view-transition-name: brand"
		>
			<Package2 class="text-primary size-6" />
			<span class="text-sm font-semibold tracking-tight">DonationsApp</span>
		</a>

		<!-- Centered brand + nav -->
		<div class="flex items-center gap-6">
			<nav class="hidden items-center gap-6 text-sm md:flex">
				<a
					href="/"
					on:click={(e) => handleNavigation('/', e)}
					class="text-muted-foreground hover:text-foreground transition-colors">Home</a
				>
				<a
					href="/about"
					on:click={(e) => handleNavigation('/about', e)}
					class="text-muted-foreground hover:text-foreground transition-colors">About</a
				>
				<a
					href="/donationspage"
					on:click={(e) => handleNavigation('/donationspage', e)}
					class="text-muted-foreground hover:text-foreground transition-colors">Donations</a
				>
				<a
					href="/donationslist"
					on:click={(e) => handleNavigation('/donationslist', e)}
					class="text-muted-foreground hover:text-foreground transition-colors"
					>Previous Donations</a
				>
			</nav>
		</div>

		<!-- Right actions -->
		<div class="flex items-center gap-3">
			<ModeToggle />
			<Button
				href="/donationspage"
				on:click={(e) => handleNavigation('/donationspage', e)}
				class="bg-primary text-primary-foreground hover:bg-primary/90 hidden h-9 items-center justify-center rounded-md px-4 text-xs font-medium shadow-sm transition-colors md:inline-flex"
			>
				Donate<ArrowRight />
			</Button>
			<Sheet>
				<SheetTrigger>
					{#snippet child({ props })}
						<Button {...props} variant="outline" size="icon" class="shrink-0 md:hidden">
							<Menu class="size-5" />
							<span class="sr-only">Toggle navigation menu</span>
						</Button>
					{/snippet}
				</SheetTrigger>
				<SheetContent side="left">
					<nav class="grid gap-4 text-base font-medium">
						<a
							href="/"
							on:click={(e) => handleNavigation('/', e)}
							class="flex items-center gap-2 rounded-md px-2 py-1"
						>
							<Package2 class="text-primary size-5" />
							<span>Donations</span>
						</a>
						<a
							href="/"
							on:click={(e) => handleNavigation('/', e)}
							class="text-muted-foreground hover:text-foreground">Home</a
						>
						<a
							href="/about"
							on:click={(e) => handleNavigation('/about', e)}
							class="text-muted-foreground hover:text-foreground">About</a
						>
						<a
							href="/donationspage"
							on:click={(e) => handleNavigation('/donationspage', e)}
							class="text-muted-foreground hover:text-foreground">Donations</a
						>
						<a
							href="/donationslist"
							on:click={(e) => handleNavigation('/donationslist', e)}
							class="text-muted-foreground hover:text-foreground">Previous Donations</a
						>
					</nav>
					<div class="mt-6 flex items-center gap-3">
						<ModeToggle />
						<Button href="/donationspage" on:click={(e) => handleNavigation('/donationspage', e)}>
							Donate <ArrowRight />
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	</div>
</header>
