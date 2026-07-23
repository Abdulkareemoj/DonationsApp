<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Kbd from '$lib/components/Kbd.svelte';
	import { CreditCard, LayoutGrid, Code2, ExternalLink } from '@lucide/svelte';

	const EMBED_SNIPPET = `<iframe
  src="https://your-donatekit-domain.com/?embed=1"
  title="Donate"
  style="border:0;width:100%;max-width:640px;height:820px;"
  loading="lazy"
></iframe>`;
</script>

<Seo
	title="About - DonationsApp"
	description="A lightweight donation page for creators. Accept one-time or monthly contributions via Paystack."
/>

<section class="w-full py-12 md:py-20">
	<div class="mx-auto max-w-4xl px-4 md:px-6">
		<div class="eyebrow mb-3">// what is this</div>
		<h1
			class="text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl"
			style="view-transition-name: page-title"
		>
			No signups. <br />
			<span class="bg-primary px-2 text-primary-foreground">Just code</span> you own.
		</h1>
		<p class="text-body text-foreground/80 mt-6 max-w-2xl">
			A lightweight donation page for creators. Accept one-time or monthly
			contributions via Paystack, records saved to your Airtable base. Deploy it as its
			own site or embed it anywhere with an iframe.
		</p>
	</div>
</section>

<section class="w-full pb-12 md:pb-20">
	<div class="mx-auto max-w-4xl px-4 md:px-6">
		<div class="grid gap-4 md:grid-cols-3">
			<div class="bg-primary text-primary-foreground brutal rounded-[--radius-md] p-5">
				<div class="flex items-center justify-between">
					<div class="brutal-sm inline-flex size-10 items-center justify-center rounded-[--radius-sm] bg-background text-foreground">
						<CreditCard class="size-5" strokeWidth={2.5} />
					</div>
					<div class="eyebrow opacity-80">01</div>
				</div>
				<h3 class="mt-4 text-xl font-black tracking-tight">Donate</h3>
				<p class="text-caption mt-2 leading-relaxed opacity-90">Presets, custom amounts, one-time or monthly. Paystack handles the payment popup.</p>
			</div>

			<div class="bg-secondary text-secondary-foreground brutal rounded-[--radius-md] p-5">
				<div class="flex items-center justify-between">
					<div class="brutal-sm inline-flex size-10 items-center justify-center rounded-[--radius-sm] bg-background text-foreground">
						<LayoutGrid class="size-5" strokeWidth={2.5} />
					</div>
					<div class="eyebrow opacity-80">02</div>
				</div>
				<h3 class="mt-4 text-xl font-black tracking-tight">Donations</h3>
				<p class="text-caption mt-2 leading-relaxed opacity-90">A live wall of supporters pulled straight from your Airtable base.</p>
			</div>

			<div class="bg-card brutal rounded-[--radius-md] p-5">
				<div class="flex items-center justify-between">
					<div class="brutal-sm inline-flex size-10 items-center justify-center rounded-[--radius-sm] bg-background text-foreground">
						<Code2 class="size-5" strokeWidth={2.5} />
					</div>
					<div class="eyebrow opacity-80">03</div>
				</div>
				<h3 class="mt-4 text-xl font-black tracking-tight">Embed anywhere</h3>
				<p class="text-caption mt-2 leading-relaxed opacity-90">Drop a single iframe on any website. Or self-host the whole thing.</p>
			</div>
		</div>
	</div>
</section>

<section class="w-full pb-12 md:pb-20">
	<div class="mx-auto max-w-4xl px-4 md:px-6">
		<div class="eyebrow mb-3">// embed snippet</div>
		<h2 class="text-2xl font-black tracking-tight sm:text-3xl">
			One tag. Drop it in.
		</h2>
		<p class="text-caption text-foreground/80 mt-2 max-w-xl">
			Append <code class="font-mono font-bold">?embed=1</code> to strip the page chrome.
		</p>
		<div class="brutal mt-6 overflow-x-auto rounded-[--radius-md] bg-ink p-5">
			<pre class="text-xs leading-relaxed text-primary"><code>{EMBED_SNIPPET}</code></pre>
		</div>
	</div>
</section>

<section class="w-full pb-16 md:pb-24">
	<div class="mx-auto max-w-4xl px-4 md:px-6">
		<div class="eyebrow mb-3">// setup</div>
		<h2 class="text-2xl font-black tracking-tight sm:text-3xl">Four env vars.</h2>
		<ol class="mt-6 space-y-3">
			<li class="brutal-sm flex items-start gap-4 rounded-[--radius-sm] bg-card p-4">
				<div class="brutal-sm flex size-10 shrink-0 items-center justify-center rounded-[--radius-sm] bg-primary text-caption font-black text-primary-foreground">01</div>
				<div>
					<div class="font-black">Create an Airtable base</div>
					<div class="text-caption text-foreground/80 mt-1">
						Add a table (default <code class="font-mono font-bold">Donors</code>)
						with fields: <Kbd>Name</Kbd> <Kbd>Email</Kbd> <Kbd>Amount</Kbd>
						<Kbd>Frequency</Kbd> <Kbd>Message</Kbd> <Kbd>Reference</Kbd> <Kbd>Date</Kbd>.
					</div>
				</div>
			</li>
			<li class="brutal-sm flex items-start gap-4 rounded-[--radius-sm] bg-card p-4">
				<div class="brutal-sm flex size-10 shrink-0 items-center justify-center rounded-[--radius-sm] bg-primary text-caption font-black text-primary-foreground">02</div>
				<div>
					<div class="font-black">Set env vars</div>
					<div class="text-caption text-foreground/80 mt-1">
						<Kbd>PAYSTACK_SECRET_KEY</Kbd> <Kbd>AIRTABLE_TOKEN</Kbd>
						<Kbd>AIRTABLE_BASE_ID</Kbd> <Kbd>AIRTABLE_TABLE_NAME</Kbd> (optional).
					</div>
				</div>
			</li>
			<li class="brutal-sm flex items-start gap-4 rounded-[--radius-sm] bg-card p-4">
				<div class="brutal-sm flex size-10 shrink-0 items-center justify-center rounded-[--radius-sm] bg-primary text-caption font-black text-primary-foreground">03</div>
				<div>
					<div class="font-black">Brand it (optional)</div>
					<div class="text-caption text-foreground/80 mt-1">
						<Kbd>VITE_CREATOR_NAME</Kbd> <Kbd>VITE_CREATOR_TAGLINE</Kbd>.
					</div>
				</div>
			</li>
		</ol>

		<div class="mt-8 flex flex-wrap gap-3">
			<a
				href="https://paystack.com"
				target="_blank"
				rel="noreferrer"
				class="brutal-sm brutal-press inline-flex items-center gap-1.5 rounded-[--radius-sm] bg-card px-4 py-2 text-caption font-black uppercase tracking-wide"
			>
				Paystack <ExternalLink class="size-3.5" strokeWidth={3} />
			</a>
			<a
				href="https://airtable.com"
				target="_blank"
				rel="noreferrer"
				class="brutal-sm brutal-press inline-flex items-center gap-1.5 rounded-[--radius-sm] bg-card px-4 py-2 text-caption font-black uppercase tracking-wide"
			>
				Airtable <ExternalLink class="size-3.5" strokeWidth={3} />
			</a>
		</div>
	</div>
</section>
