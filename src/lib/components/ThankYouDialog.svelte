<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { downloadReceipt, type ReceiptData } from '$lib/utils/receipt';
	import { CheckCircle, Download, Copy } from '@lucide/svelte';

	export let open: boolean = false;
	export let donationData: ReceiptData | null = null;

	let copied = false;

	function handleCopy() {
		if (!donationData) return;
		navigator.clipboard.writeText(donationData.reference).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		});
	}

	function handleDownload() {
		if (!donationData) return;
		downloadReceipt(donationData);
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="brutal-lg bg-card max-w-md p-0 overflow-hidden">
		<div class="bg-primary flex items-center justify-center border-b-2 border-ink p-6">
			<div class="flex flex-col items-center gap-2 text-center">
				<CheckCircle class="size-10 text-ink" />
				<Dialog.Title class="text-h2 text-ink">Thank you!</Dialog.Title>
				<Dialog.Description class="text-body text-ink/70">
					Your donation was processed successfully.
				</Dialog.Description>
			</div>
		</div>

		{#if donationData}
			<div class="p-6 flex flex-col gap-3">
				<div class="flex flex-col gap-2">
					<div class="flex justify-between">
						<span class="text-caption text-muted-foreground">Amount</span>
						<span class="text-body font-bold text-ink">₦{donationData.amount.toLocaleString()}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-caption text-muted-foreground">Type</span>
						<span class="text-body text-ink">{donationData.donationType}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-caption text-muted-foreground">Date</span>
						<span class="text-body text-ink">
							{new Date(donationData.date).toLocaleDateString('en-NG', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</span>
					</div>
					<div class="border-ink/10 border-t-2 pt-3">
						<div class="flex items-center justify-between">
							<span class="text-caption text-muted-foreground">Reference</span>
							<div class="flex items-center gap-1">
								<code class="bg-muted text-ink rounded border-2 border-ink/10 px-1.5 py-0.5 font-mono text-caption">
									{donationData.reference}
								</code>
								<button
									onclick={handleCopy}
									class="hover:bg-muted inline-flex size-6 items-center justify-center rounded transition-colors"
									aria-label="Copy reference"
								>
									{#if copied}
										<CheckCircle class="size-3 text-success" />
									{:else}
										<Copy class="size-3 text-muted-foreground" />
									{/if}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<Dialog.Footer class="p-6 pt-0 flex flex-col gap-2">
			{#if donationData}
				<Button
					onclick={handleDownload}
					class="brutal-press bg-primary text-ink text-body font-bold border-2 border-ink w-full"
				>
					<Download class="mr-2 size-4" />
					Download PDF Receipt
				</Button>
			{/if}
			<Dialog.Close asChild>
				<Button variant="outline" class="border-2 border-ink text-body font-bold w-full">
					Close
				</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
