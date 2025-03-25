<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Sheet, SheetContent, SheetTrigger } from "$lib/components/ui/sheet";
	import ModeToggle from "./modeToggle.svelte";
	import { Menu, Package2, Search } from "lucide-svelte";
  import { navigateWithTransition } from '$lib/hooks/useViewTransition';
  
	let isOpen = false;
 function handleNavigation(url: string, event: MouseEvent) {
    event.preventDefault();
    navigateWithTransition(url);
  }
</script>

<header class="bg-background/70 sticky top-0 z-50 flex h-16 items-center gap-4 border-b px-4 backdrop-blur md:px-6">
	<nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
		<div class="flex items-center gap-2 text-lg font-semibold md:text-base">
			<Package2 class="size-6" />
			<span class="sr-only">Acme Inc</span>
		</div>
		<a href="/" on:click={(e) => handleNavigation('/', e)}  class="text-muted-foreground hover:text-foreground transition-colors">Home</a>
		<a href="/about" on:click={(e) => handleNavigation('/about', e)}  class="text-muted-foreground hover:text-foreground transition-colors">About</a>
		<a href="/donationspage" on:click={(e) => handleNavigation('/donationspage', e)}  class="text-muted-foreground hover:text-foreground transition-colors">Donations</a>
		<a href="/donationslist" on:click={(e) => handleNavigation('/donationslist', e)}  class="text-muted-foreground hover:text-foreground transition-colors">Previous Donations</a>
	</nav>
	
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
			<nav class="grid gap-6 text-lg font-medium">
				<a href="##" class="flex items-center gap-2 text-lg font-semibold">
					<Package2 class="size-6" />
					<span class="sr-only">Acme Inc</span>
				</a>
			<a href="/" on:click={(e) => handleNavigation('/', e)}  class="text-muted-foreground hover:text-foreground ">Home</a>
		<a href="/about"  on:click={(e) => handleNavigation('/about', e)} class="text-muted-foreground hover:text-foreground ">About</a>
		<a href="/donationspage" on:click={(e) => handleNavigation('/donationspage', e)} class="text-muted-foreground hover:text-foreground ">Donations</a>
		<a href="/donationslist" on:click={(e) => handleNavigation('/donationslist', e)}  class="text-muted-foreground hover:text-foreground ">Previous Donations</a>
			</nav>
		</SheetContent>
	</Sheet>
	
	<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
		<form class="ml-auto flex-1 sm:flex-initial">
			<div class="relative">
				<Search class="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
				<Input type="search" placeholder="Search" class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
			</div>
		</form>
		
		<ModeToggle />
	</div>
</header>