<script lang="ts">
	import DonationForm from './donation-form.svelte';
	import CreatorCard from '$lib/components/CreatorCard.svelte';
	import GoalCard from '$lib/components/GoalCard.svelte';
	import RecentSupporters from '$lib/components/RecentSupporters.svelte';
	import PerksStrip from '$lib/components/PerksStrip.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { Sparkles } from "@lucide/svelte";
import TypingAnimation from '$lib/components/TypingAnimation.svelte';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();

	const creatorName = import.meta.env.VITE_CREATOR_NAME || 'Creator';
	const tagline = import.meta.env.VITE_CREATOR_TAGLINE || 'Building cool things.';
	const bio = import.meta.env.VITE_CREATOR_BIO || 'Independent maker shipping tools that help people.';
	const twitter = import.meta.env.VITE_CREATOR_TWITTER || '';
	const github = import.meta.env.VITE_CREATOR_GITHUB || '';
	const website = import.meta.env.VITE_CREATOR_WEBSITE || '';
	const goalAmount = Number(import.meta.env.VITE_GOAL_AMOUNT) || 100000;
	const goalLabel = import.meta.env.VITE_GOAL_LABEL || 'Support the creator';

	const totalRaised = $derived(data.donations?.reduce((sum, d) => sum + d.amount, 0) ?? 0);
	const supporterCount = $derived(data.donations?.length ?? 0);

	const faqs = [
		{
			q: "Is my payment secure?",
			a: "Yes, checkout runs on Paystack. Your card details never touch this site."
		},
		{
			q: "Do I need an account?",
			a: "Nope. Just enter your name, email, and pick an amount. That's it."
		},
		{
			q: "Can I donate monthly?",
			a: "Yes. Pick 'Monthly' before checkout. You can cancel from your Paystack receipt anytime."
		},
		{
			q: "Where does the money go?",
			a: "Straight to the creator's Paystack account. 100% of your donation, minus Paystack's fees."
		}
	];
</script>

<Seo
	title="Donate - {creatorName}"
	description="Support {creatorName} with a one-time or monthly donation."
/>

<main class="w-full py-12 md:py-16 lg:py-24" style="view-transition-name: main-content">
	<div class="mx-auto max-w-6xl px-4 md:px-6">
 <div class="mb-10">
          <div class="eyebrow mb-3 flex items-center gap-2">
            <Sparkles class="size-3.5" strokeWidth={3} /> // donation page
          </div>
          <h1 class="text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
            Buy me a{" "}
          <span class="bg-primary px-2 text-primary-foreground">  <TypingAnimation words={["Cofee 🎨", "Hot Dog 🔨", "Beer 🚀"]} loop /></span>
            <br />
            fund the next drop.
          </h1>
          <p class="mt-4 max-w-xl text-base text-foreground/80">
            No signups, no subscriptions to cancel. Just a fast, friendly way to say thanks
            in Naira via Paystack.
          </p>
   </div>

		<div class="grid gap-8 lg:grid-cols-5">
			<div class="flex flex-col gap-8 lg:col-span-3">
				<DonationForm {data} />
				<PerksStrip />
			</div>

			<div class="flex flex-col gap-4 lg:col-span-2">
				<CreatorCard
					{creatorName}
					{tagline}
					{bio}
					{twitter}
					{github}
					{website}
					supporters={supporterCount}
				/>
				<GoalCard {goalAmount} {goalLabel} currentAmount={totalRaised} />
				<RecentSupporters donations={data.donations ?? []} />
			</div>
		</div>
		<div class="mt-16">
			<div class="mb-6">
				<div class="eyebrow mb-2">// frequently asked</div>
				<h2 class="text-h2 font-black tracking-tight">Questions, answered</h2>
			</div>
			<div class="grid gap-4 md:grid-cols-2">
				{#each faqs as faq}
					<details class="brutal group rounded-[--radius-md] bg-card p-5">
						<summary class="flex cursor-pointer items-center justify-between gap-4 text-body font-black">
							{faq.q}
							<span class="brutal-sm flex size-7 shrink-0 items-center justify-center rounded-[--radius-sm] bg-primary text-primary-foreground transition-transform group-open:rotate-45">
								+
							</span>
						</summary>
						<p class="mt-3 text-caption leading-relaxed text-foreground/80">{faq.a}</p>
					</details>
				{/each}
			</div>
		</div>
	</div>
</main>
