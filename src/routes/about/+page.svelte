<script>
	import FeatureCard from '$lib/magicui/FeatureCard.svelte';
	import { Eye, PackageSearch, Settings } from 'lucide-svelte';
	// Company milestones

	// Testimonials
	const testimonials = [
		{
			quote:
				'DonationsApp changed everything for me. I can now focus on creating content I love, knowing my community has my back.',
			author: 'Maya Chen',
			role: 'Digital Artist'
		},
		{
			quote:
				"The platform is incredibly easy to use, both for me and my supporters. It's become an essential part of my creative business.",
			author: 'James Wilson',
			role: 'Podcaster'
		},
		{
			quote:
				"I've tried other platforms, but DonationsApp's focus on simplicity and fair fees makes it the best choice for independent creators.",
			author: 'Sophia Rodriguez',
			role: 'Writer & Educator'
		}
	];

	let data = [
		{
			id: 1,
			year: '2021',
			description:
				'DonationsApp was founded with a simple idea: make it easy for creators to get paid directly by their audience.',
			image: 'https://i.pinimg.com/736x/ca/aa/49/caaa49d386d84f2d037d0abcc919778f.jpg',
			icon: PackageSearch
		},
		{
			id: 2,
			year: '2022',
			description: 'Reached our first 1,000 creators and processed over $1 million in payments.',
			image: 'https://i.pinimg.com/736x/a5/dc/0a/a5dc0af50d185b7f9111949b17e17e1a.jpg',
			icon: Settings
		},
		{
			id: 3,
			year: '2023',
			description: 'Launched subscription support, creator analytics, and custom domains.',
			image: 'https://i.pinimg.com/736x/b1/b9/c2/b1b9c230143fb0d8540eabe5b74adf27.jpg',
			icon: Eye
		},
		{
			id: 4,
			year: '2024',
			description: 'Expanded to support creators in over 30 countries worldwide.',
			image: 'https://i.pinimg.com/736x/b1/b9/c2/b1b9c230143fb0d8540eabe5b74adf27.jpg',
			icon: Eye
		}
	];

	import Seo from '$lib/components/Seo.svelte';
	import Testimonials from '$lib/magicui/Testimonials.svelte';
</script>

<Seo
	title="About — DonationsApp"
	description="Learn about our mission to empower the creator economy."
/>

<main class="bg-background text-foreground min-h-screen">
	<!-- Hero Section -->
	<section class="relative w-full py-16 md:py-28 lg:py-32">
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
			<div
				class="bg-primary/20 absolute top-[-140px] left-1/2 h-[320px] w-[880px] -translate-x-1/2 rounded-full blur-3xl"
			></div>
			<div
				class="bg-muted/60 absolute right-[-200px] bottom-[-160px] h-[260px] w-[520px] rounded-full blur-3xl"
			></div>
		</div>
		<div class="container px-4 md:px-6">
			<div class="mx-auto max-w-3xl text-center">
				<span
					class="text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
				>
					<span class="bg-primary h-1.5 w-1.5 rounded-full"></span>
					Our story
				</span>
				<h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
					Built for creators, by creators
				</h1>
				<p class="text-muted-foreground mt-4 md:text-lg">
					We're on a mission to empower creators to do what they love and get paid for it.
				</p>
			</div>
		</div>
	</section>

	<!-- Our Mission -->
	<section class="w-full py-8 md:py-18 lg:py-20">
		<div class="container mx-auto w-full px-4 md:px-6">
			<div class="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
				<div class="space-y-4">
					<div class="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
						Our Mission
					</div>
					<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">
						Empowering the Creator Economy
					</h2>
					<p class="text-muted-foreground md:text-xl/relaxed">
						At DonationsApp, we believe that creators should be able to earn a living doing what
						they love. Our platform is designed to remove barriers between creators and their
						audience, making it simple for fans to directly support the work they value.
					</p>
					<p class="text-muted-foreground md:text-xl/relaxed">
						We're building a future where creative work is valued and supported, where creators have
						the freedom to focus on their craft, and where audiences can directly invest in the
						content they care about.
					</p>
				</div>
				<div class="flex justify-center">
					<div class="relative h-[400px] w-[400px] overflow-hidden rounded-lg">
						<img
							src="/placeholder.svg?height=400&width=400"
							alt="Creator working on content"
							class="h-full w-full object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Our Values -->
	<section class="bg-muted/50 w-full py-8 md:py-18 lg:py-20">
		<div class="container px-4 md:px-6">
			<div class="flex flex-col items-center justify-center space-y-4 text-center">
				<div class="space-y-2">
					<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
					<p
						class="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
					>
						The principles that guide everything we do.
					</p>
				</div>
			</div>
			<div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
				<div class="bg-card flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-xs">
					<div
						class="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-6 w-6"
						>
							<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
							></path>
							<path d="m9 12 2 2 4-4"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold">Transparency</h3>
					<p class="text-muted-foreground text-center">
						We believe in clear, fair pricing and open communication with our community.
					</p>
				</div>
				<div class="bg-card flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-xs">
					<div
						class="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-6 w-6"
						>
							<path
								d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"
							></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold">Creator First</h3>
					<p class="text-muted-foreground text-center">
						Every decision we make puts creators' needs at the center.
					</p>
				</div>
				<div class="bg-card flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-xs">
					<div
						class="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-6 w-6"
						>
							<path d="M12 2v20"></path>
							<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold">Simplicity</h3>
					<p class="text-muted-foreground text-center">
						We keep our platform simple and intuitive so creators can focus on creating.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats strip -->
	<section class="w-full py-8">
		<div class="container px-4 md:px-6">
			<div class="pb-8">
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Stats</h2>
					<p
						class="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
					>
						A few numbers that show our impact so far.
					</p>
				</div>
			</div>
			<div class="mx-auto grid max-w-5xl grid-cols-1 gap-4 text-center md:grid-cols-3">
				<div class="bg-card rounded-lg border p-6">
					<div class="text-3xl font-bold">10k+</div>
					<div class="text-muted-foreground text-sm">Active creators</div>
				</div>
				<div class="bg-card rounded-lg border p-6">
					<div class="text-3xl font-bold">$5M+</div>
					<div class="text-muted-foreground text-sm">Processed donations</div>
				</div>
				<div class="bg-card rounded-lg border p-6">
					<div class="text-3xl font-bold">30+</div>
					<div class="text-muted-foreground text-sm">Supported countries</div>
				</div>
			</div>
		</div>
	</section>

	<FeatureCard {data} />

	<!-- Testimonials -->
	<section class="w-full py-8 md:py-18 lg:py-20">
		<div class="container px-4 md:px-6">
			<div class="flex flex-col items-center justify-center space-y-4 text-center">
				<div class="space-y-2">
					<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">What Creators Say</h2>
					<p
						class="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
					>
						Don't just take our word for it - hear from the creators using our platform.
					</p>
				</div>
			</div>
			<!-- <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
				{#each testimonials as testimonial}
					<div
						class="bg-card flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-xs"
					>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-primary/20 h-8 w-8"
							>
								<path
									d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
								></path>
								<path
									d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
								></path>
							</svg>
							<p class="mt-4 text-lg">{testimonial.quote}</p>
						</div>
						<div>
							<p class="font-semibold">{testimonial.author}</p>
							<p class="text-muted-foreground text-sm">{testimonial.role}</p>
						</div>
					</div>
				{/each}
			</div> -->
			<Testimonials />
		</div>
	</section>

	<!-- Contact Section -->
	<section class="bg-primary text-primary-foreground w-full py-12 md:py-24 lg:py-32">
		<div class="container px-4 md:px-6">
			<div class="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
				<div class="space-y-4">
					<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
					<p class="md:text-xl/relaxed">
						Have questions about DonationsApp? We'd love to hear from you. Our team is always ready
						to help creators get the most out of our platform.
					</p>
					<div class="space-y-2">
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="mr-2 h-5 w-5"
							>
								<rect width="20" height="16" x="2" y="4" rx="2"></rect>
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
							</svg>
							<span>hello@DonationsApp.example</span>
						</div>
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="mr-2 h-5 w-5"
							>
								<path
									d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
								></path>
							</svg>
							<span>+1 (555) 123-4567</span>
						</div>
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="mr-2 h-5 w-5"
							>
								<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg>
							<span>123 Creator Street, San Francisco, CA 94107</span>
						</div>
					</div>
				</div>
				<div class="bg-card rounded-lg border p-6 shadow-xs">
					<form class="space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<label
									for="first-name"
									class="text-foreground text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									First name
								</label>
								<input
									id="first-name"
									class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
									placeholder="Enter your first name"
								/>
							</div>
							<div class="space-y-2">
								<label
									for="last-name"
									class="text-foreground text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Last name
								</label>
								<input
									id="last-name"
									class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
									placeholder="Enter your last name"
								/>
							</div>
						</div>
						<div class="space-y-2">
							<label
								for="email"
								class="text-foreground text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
								placeholder="Enter your email"
							/>
						</div>
						<div class="space-y-2">
							<label
								for="message"
								class="text-foreground text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Message
							</label>
							<textarea
								id="message"
								class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-foreground flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
								placeholder="Enter your message"
							></textarea>
						</div>
						<button
							type="submit"
							class="bg-background text-primary hover:bg-accent focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-hidden"
						>
							Send Message
						</button>
					</form>
				</div>
			</div>
		</div>
	</section>
</main>
