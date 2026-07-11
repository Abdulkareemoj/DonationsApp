<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Code, CreditCard, LayoutDashboard, ExternalLink } from '@lucide/svelte';
</script>

<Seo
	title="How to Use — DonationsApp"
	description="A simple donation page you can add to your website. Learn how it works."
/>

<main class="bg-background text-foreground min-h-screen">
	<section class="w-full py-12 md:py-20">
		<div class="container mx-auto max-w-3xl px-4 md:px-6">
			<div class="flex flex-col items-center gap-3 text-center">
				<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">What is this?</h1>
				<p class="text-muted-foreground mx-auto max-w-xl text-base">
					A lightweight, self-hosted donation page for creators. Accept one-time or monthly
					contributions via Paystack, with donor records stored in Airtable.
				</p>
			</div>
		</div>
	</section>

	<div class="container mx-auto max-w-3xl px-4 md:px-6">
		<Separator />
	</div>

	<section class="w-full py-12 md:py-16">
		<div class="container mx-auto max-w-3xl px-4 md:px-6">
			<h2 class="mb-6 text-xl font-semibold tracking-tight">How it works</h2>
			<div class="flex flex-col gap-3">
				<div class="bg-card flex items-start gap-4 rounded-lg border p-5">
					<div
						class="bg-primary/10 text-primary mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md"
					>
						<CreditCard />
					</div>
					<div>
						<h3 class="font-medium">Donation page</h3>
						<p class="text-muted-foreground mt-1 text-sm leading-relaxed">
							A single page with a creator profile card and a form. Supporters enter their name,
							email, pick a preset amount or type a custom one, choose one-time or monthly, and pay
							through Paystack's secure popup.
						</p>
					</div>
				</div>
				<div class="bg-card flex items-start gap-4 rounded-lg border p-5">
					<div
						class="bg-primary/10 text-primary mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md"
					>
						<LayoutDashboard />
					</div>
					<div>
						<h3 class="font-medium">Donations list</h3>
						<p class="text-muted-foreground mt-1 text-sm leading-relaxed">
							A table view of all donations pulled from Airtable. Search, sort, paginate, and manage
							your supporter records in one place.
						</p>
					</div>
				</div>
				<div class="bg-card flex items-start gap-4 rounded-lg border p-5">
					<div
						class="bg-primary/10 text-primary mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md"
					>
						<Code />
					</div>
					<div>
						<h3 class="font-medium">Self-hosted</h3>
						<p class="text-muted-foreground mt-1 text-sm leading-relaxed">
							Deploy to Vercel, Netlify, or any Node-compatible host. Your data stays in your
							Airtable base — no third-party dashboard.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div class="container mx-auto max-w-3xl px-4 md:px-6">
		<Separator />
	</div>

	<section class="w-full py-12 md:py-16">
		<div class="container mx-auto max-w-3xl px-4 md:px-6">
			<h2 class="mb-6 text-xl font-semibold tracking-tight">Add it to your site</h2>
			<div class="flex flex-col gap-3">
				<div class="rounded-lg border p-5">
					<h3 class="font-medium">1. Clone and configure</h3>
					<p class="text-muted-foreground mt-1 text-sm leading-relaxed">
						Clone the repo, install dependencies, and add your Paystack public key and Airtable
						credentials to <code
							class="bg-muted text-foreground mx-0.5 rounded px-1.5 py-0.5 text-xs">.env</code
						>.
					</p>
				</div>
				<div class="rounded-lg border p-5">
					<h3 class="font-medium">2. Customise the creator profile</h3>
					<p class="text-muted-foreground mt-1 text-sm leading-relaxed">
						Edit the placeholder name, bio, avatar, and social links in the donation form component
						to match your brand.
					</p>
				</div>
				<div class="rounded-lg border p-5">
					<h3 class="font-medium">3. Deploy</h3>
					<p class="text-muted-foreground mt-1 text-sm leading-relaxed">
						Push to GitHub and deploy. The Vercel adapter is pre-configured — just connect your repo
						and done.
					</p>
				</div>
			</div>
			<div class="mt-8">
				<Button href="/donationspage">
					Try it now <ExternalLink data-icon="inline-end" />
				</Button>
			</div>
		</div>
	</section>
</main>
