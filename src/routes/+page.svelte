<script>
	import { onMount } from 'svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import SimpleVariant from '$lib/magicui/custom-card/SimpleVariant.svelte';
	// Creator information
	const creator = {
		name: 'Sarah Johnson',
		tagline: 'Digital Artist & Illustrator',
		avatar: '/placeholder.svg?height=150&width=150',
		description:
			'I create digital art and illustrations inspired by nature and fantasy. Your support helps me continue creating and sharing my work with the world.'
	};

	const faqItems = [
		{
			title: 'How do payouts work?',
			content:
				'Donations are processed securely and paid out to your connected account on a regular schedule.'
		},
		{
			title: 'Can I accept recurring donations?',
			content: 'Yes, supporters can choose monthly contributions. You can manage plans anytime.'
		},
		{
			title: 'What are the fees?',
			content:
				'We keep fees low and transparent. Processing fees may apply depending on your region.'
		}
	];

	// Handle support button click
	function handleSupportClick() {
		alert('Thank you for your support!');
		// In a real app, this would open a payment modal or redirect to a payment page
	}
	import Seo from '$lib/components/Seo.svelte';
	import Globe from '$lib/magicui/Globe.svelte';
	import AnimatedBeamMultipleInput from '$lib/magicui/AnimatedBeamMultipleInput.svelte';
	import Marquee from '$lib/magicui/Marquee.svelte';
	import SquareCard from '$lib/magicui/square-card/SquareCard.svelte';

	let mounted = false;
	onMount(() => {
		mounted = true;
	});
</script>

<Seo
	title="DonationsApp - Home"
	description="Support creators you love with one-time or monthly donations."
/>

<main class="bg-background text-foreground min-h-screen">
	<!-- Decorative background -->
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<div
			class="bg-primary/20 absolute top-[-120px] left-1/2 h-[300px] w-[800px] -translate-x-1/2 rounded-full blur-3xl"
		></div>
		<div
			class="bg-muted/60 absolute right-[-200px] bottom-[-120px] h-[240px] w-[480px] rounded-full blur-3xl"
		></div>
	</div>

	<!-- Hero Section -->
	<section class="w-full py-8 md:py-14 lg:py-8" style="view-transition-name: hero-section">
		<div class="container mx-auto w-full px-4 md:px-6">
			<div class="grid items-center gap-8 lg:grid-cols-2">
				<div class="space-y-6 text-center lg:text-left">
					<span
						class="text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
					>
						<span class="bg-primary h-1.5 w-1.5 rounded-full"></span>
						Crowdfunding for creators
					</span>
					<h1
						class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
						style="view-transition-name: main-heading"
					>
						Support creators you love, in seconds
					</h1>
					<p class="text-muted-foreground mx-auto max-w-[620px] md:text-lg lg:mx-0">
						Beautiful, simple donations for your audience. One-time or monthly, with secure checkout
						and instant notifications.
					</p>
					<div
						class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
					>
						<a
							href="/donationspage"
							class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium shadow-sm transition-colors"
							style="view-transition-name: get-started-button">Get Started</a
						>
						<a
							href="/about"
							class="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-medium shadow-xs transition-colors"
							>Learn More</a
						>
					</div>
					<div
						class="text-muted-foreground mt-4 flex items-center justify-center gap-6 text-xs lg:justify-start"
					>
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-emerald-500"></span> No platform lock-in
						</div>
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-blue-500"></span> Low fees
						</div>
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-amber-500"></span> Secure payments
						</div>
					</div>
				</div>
				<div class="relative mx-auto w-full max-w-xl">
					<SimpleVariant>
						<div
							class="bg-card/70 relative p-6 backdrop-blur"
							style="view-transition-name: hero-card"
						>
							<div class="flex items-center gap-4">
								<img
									src={creator.avatar}
									alt="Avatar"
									class="h-14 w-14 rounded-full"
									style="view-transition-name: creator-avatar"
								/>
								<div>
									<p class="text-muted-foreground text-sm">Featured creator</p>
									<p class="font-semibold">{creator.name}</p>
								</div>
							</div>
							<p class="text-muted-foreground mt-4 text-sm">“{creator.description}”</p>
							<div class="mt-6 grid grid-cols-3 divide-x rounded-lg border">
								<div class="p-4 text-center">
									<div class="text-2xl font-bold">12k+</div>
									<div class="text-muted-foreground text-xs">Supporters</div>
								</div>
								<div class="p-4 text-center">
									<div class="text-2xl font-bold">$480k</div>
									<div class="text-muted-foreground text-xs">Raised</div>
								</div>
								<div class="p-4 text-center">
									<div class="text-2xl font-bold">92%</div>
									<div class="text-muted-foreground text-xs">Recurring</div>
								</div>
							</div>
						</div>
					</SimpleVariant>
				</div>
			</div>
		</div>
	</section>

	<!-- Globe-->
	<section class="container mx-auto w-full max-w-5xl py-6 md:py-5">
		<div class="flex h-auto w-full items-center justify-center md:h-[80vh]">
			<div
				class="bg-background relative flex h-fit w-full flex-col items-center justify-center overflow-hidden rounded-lg border px-4 pt-8 pb-24 text-center md:px-10 md:pb-40 md:shadow-xl"
			>
				<span
					class="from-foreground to-muted-foreground pointer-events-none bg-gradient-to-b bg-clip-text text-5xl leading-tight font-semibold whitespace-pre-wrap text-transparent md:text-8xl"
				>
					Donate From Anywhere
				</span>
				<Globe class="top-10 md:top-30" />
				<div
					class="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]"
				></div>
			</div>
		</div>
	</section>

	<!-- Logos / Social proof -->
	<!-- <section class="">
		<div class="px-4 md:px-6">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-xl font-bold tracking-tight sm:text-4xl">
					Trusted by thousands of creators worldwide
				</h2>
			</div>
		</div>
	</section> -->

	<!-- Features Section -->
	<section id="features" class="bg-muted/40 w-full py-12 md:py-20">
		<div class="container mx-auto w-full px-4 md:px-6">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
					Everything you need to get supported
				</h2>
				<p class="text-muted-foreground mt-3">
					From a beautiful donation page to seamless payments and analytics, we’ve got you covered.
				</p>
			</div>
			<div class="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
				<div class="bg-card rounded-xl border p-6 shadow-xs">
					<div
						class="bg-primary/10 text-primary mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full"
					>
						💳
					</div>
					<h3 class="text-lg font-semibold">Fast, secure checkout</h3>
					<p class="text-muted-foreground mt-2 text-sm">
						Optimized checkout with top payment providers and fraud protection.
					</p>
				</div>
				<div class="bg-card rounded-xl border p-6 shadow-xs">
					<div
						class="bg-primary/10 text-primary mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full"
					>
						📈
					</div>
					<h3 class="text-lg font-semibold">Insights & analytics</h3>
					<p class="text-muted-foreground mt-2 text-sm">
						Track donations, recurring revenue and supporter growth in real-time.
					</p>
				</div>
				<div class="bg-card rounded-xl border p-6 shadow-xs">
					<div
						class="bg-primary/10 text-primary mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full"
					>
						🔗
					</div>
					<h3 class="text-lg font-semibold">Share anywhere</h3>
					<p class="text-muted-foreground mt-2 text-sm">
						A simple link that works across your socials, website and newsletters.
					</p>
				</div>
			</div>
		</div>
	</section>
	<!-- Diagram Outline -->
	<section class="container mx-auto w-full max-w-4xl p-6 md:py-10">
		{#if mounted}
			<AnimatedBeamMultipleInput />
		{/if}
	</section>

	<!-- Featured Creator -->
	<section
		id="creators"
		class="w-full py-12 md:py-20"
		style="view-transition-name: creator-section"
	>
		<div class=" px-4 md:px-6">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Featured creator</h2>
				<p class="text-muted-foreground mt-3">
					See how creators are using our platform to connect with supporters.
				</p>
			</div>
			<div class="mx-auto mt-10 max-w-3xl">
				<div class="bg-card overflow-hidden rounded-2xl border shadow-sm">
					<div class="from-primary/30 to-primary h-36 w-full bg-linear-to-r"></div>
					<div class="p-6">
						<div class="flex flex-col items-center sm:flex-row sm:items-start">
							<img
								src={creator.avatar || '/placeholder.svg'}
								alt={creator.name}
								class="border-background -mt-16 h-24 w-24 rounded-full border-4 sm:mr-6"
								style="view-transition-name: creator-avatar"
							/>
							<div class="mt-4 text-center sm:mt-0 sm:text-left">
								<h3 class="text-2xl font-bold" style="view-transition-name: creator-name">
									{creator.name}
								</h3>
								<p class="text-muted-foreground">{creator.tagline}</p>
								<p class="mt-4 text-sm">{creator.description}</p>
								<div class="mt-6 flex flex-col gap-3 sm:flex-row">
									<button
										onclick={handleSupportClick}
										class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow-sm transition-colors"
										style="view-transition-name: support-button">Support this creator</button
									>
									<a
										href="/donationspage"
										class="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-6 text-sm font-medium shadow-xs transition-colors"
										style="view-transition-name: donations-link">Open donations</a
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="bg-muted/40 w-full py-12 md:py-20">
		<div class="container mx-auto w-full px-4 md:px-6">
			<Marquee pauseOnHover class=" gap-5 [--duration:20s]">
				<SquareCard
					description="“Switching to this platform doubled my monthly support.”"
					title="Alex • Podcaster"
				/>
				<SquareCard
					description="“Setup took minutes and my donors love the simplicity.”"
					title="Maya • Designer"
				/>
				<SquareCard
					description="“The analytics help me plan content around supporter peaks.”"
					title="Ken • Developer"
				/></Marquee
			>
		</div>
	</section>

	<!-- CTA Section -->
	<section
		id="get-started"
		class="w-full py-16 md:py-24 lg:py-28"
		style="view-transition-name: cta-section"
	>
		<div class="container mx-auto w-full px-4 md:px-6">
			<div class="bg-primary text-primary-foreground rounded-2xl border px-6 py-12 shadow-sm">
				<div class="mx-auto flex max-w-3xl flex-col items-center text-center">
					<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get supported?</h2>
					<p class="mt-3 opacity-90">
						Join thousands of creators who are getting direct support from their audience.
					</p>
					<div class="mt-6 flex flex-col items-center gap-3 sm:flex-row">
						<a
							href="/donationspage"
							class="bg-background text-primary hover:bg-accent inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium shadow-sm transition-colors"
							>Create your page</a
						>
						<a
							href="/about"
							class="border-background/40 bg-primary/20 text-primary-foreground/90 hover:bg-primary/30 inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-medium"
							>How it works</a
						>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Quick Start -->
	<section class="w-full py-12 md:py-20">
		<div class="container mx-auto w-full px-4 md:px-6">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Get started in minutes</h2>
				<p class="text-muted-foreground mt-3">It’s this simple to launch your donations page.</p>
			</div>
			<div class="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
				<div class="bg-card rounded-xl border p-5">
					<div class="text-muted-foreground text-sm font-semibold">Step 1</div>
					<div class="mt-1 text-lg font-semibold">Create your page</div>
					<p class="text-muted-foreground mt-2 text-sm">Add your name, avatar and a short bio.</p>
				</div>
				<div class="bg-card rounded-xl border p-5">
					<div class="text-muted-foreground text-sm font-semibold">Step 2</div>
					<div class="mt-1 text-lg font-semibold">Connect payments</div>
					<p class="text-muted-foreground mt-2 text-sm">
						Enable secure one-time or monthly donations.
					</p>
				</div>
				<div class="bg-card rounded-xl border p-5">
					<div class="text-muted-foreground text-sm font-semibold">Step 3</div>
					<div class="mt-1 text-lg font-semibold">Share your link</div>
					<p class="text-muted-foreground mt-2 text-sm">Post it on your socials and website.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section class="bg-muted/40 w-full py-12 md:py-20">
		<div class="container mx-auto w-full px-4 md:px-6">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
				<p class="text-muted-foreground mt-3">Answers to the most common questions.</p>
			</div>
			<Accordion.Root class="mx-auto mt-8 w-full max-w-3xl" type="single" collapsible>
				{#each faqItems as item, index}
					<Accordion.Item value="item-{index + 1}" class="bg-card rounded-xl border shadow-xs">
						<Accordion.Trigger
							class="px-5 text-left text-base font-semibold [&&>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0"
						>
							{item.title}
						</Accordion.Trigger>
						<Accordion.Content class="text-muted-foreground px-5 pb-4 text-sm">
							{item.content}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</section>
</main>
