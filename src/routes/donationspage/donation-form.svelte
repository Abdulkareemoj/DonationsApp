<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import * as Field from '$lib/components/ui/field';
	import * as InputGroup from '$lib/components/ui/input-group';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { Coffee } from '@lucide/svelte';
	import PaystackButton from './paystackButton.svelte';
	import ThankYouDialog from '$lib/components/ThankYouDialog.svelte';
	import type { ReceiptData } from '$lib/utils/receipt';
	import { onMount } from 'svelte';

	const MAX_DONATION_IN_NAIRA = 10000;
	const presets = [100, 500, 1000, 5000, 10000];

	export let data;

	const form = superForm(data.form, { resetForm: false });
	const { form: formData, errors } = form;

	let isCustomAmount = false;
	let quantityError: string | null = null;
	let showThankYou = false;
	let receiptData: ReceiptData | null = null;
	let paymentError = '';

	onMount(async () => {
		const reference = new URLSearchParams(window.location.search).get('reference');
		if (!reference) return;

		window.history.replaceState({}, '', window.location.pathname + window.location.hash);
		try {
			const response = await fetch('/api/payments/verify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ reference })
			});
			const result = await response.json();
			if (!response.ok || !result.donation) throw new Error(result.message || 'Payment verification failed.');

			receiptData = {
				creatorName: import.meta.env.VITE_CREATOR_NAME || 'Creator',
				donorName: result.donation.name,
				email: $formData.donationEmail,
				amount: result.donation.amount,
				reference: result.donation.reference,
				date: result.donation.date,
				donationType: 'one-time'
			};
			showThankYou = true;
		} catch (error) {
			paymentError = error instanceof Error ? error.message : 'Payment verification failed.';
		}
	});

	function handlePresetAmount(value: string) {
		paymentError = '';
		if (value === 'custom') {
			isCustomAmount = true;
			$formData.selectedPreset = undefined;
			$formData.amount = undefined;
			return;
		}

		isCustomAmount = false;
		quantityError = null;
		const numValue = parseInt(value);
		if (!isNaN(numValue)) {
			$formData.selectedPreset = numValue;
			$formData.amount = numValue;
		}
	}

	function handleCustomAmount(event: Event) {
		paymentError = '';
		const target = event.target as HTMLInputElement;
		const value = parseInt(target.value, 10);

		if (isNaN(value)) {
			$formData.amount = undefined;
			return;
		}

		if (value > MAX_DONATION_IN_NAIRA) {
			quantityError = `Maximum donation amount is ${MAX_DONATION_IN_NAIRA}`;
		} else if (value < 100) {
			quantityError = 'Minimum donation amount is 100';
		} else {
			quantityError = null;
		}

		isCustomAmount = true;
		$formData.selectedPreset = undefined;
		$formData.amount = value;
	}
</script>

<div class="bg-card brutal-lg p-5">
	<h2 class="text-h3 text-ink mb-4">Make a donation</h2>

	<form onsubmit={(event) => event.preventDefault()}>
		<Field.FieldGroup>
			<Field.Field data-invalid={$errors.name ? true : undefined}>
				<Field.FieldLabel for="name" class="text-label">Name</Field.FieldLabel>
				<Field.FieldContent>
					<InputGroup.Root>
						<InputGroup.Input
							id="name"
							placeholder="Enter your name"
							bind:value={$formData.name}
							aria-invalid={$errors.name ? true : undefined}
						/>
					</InputGroup.Root>
					{#if $errors.name}
						<Field.FieldError errors={[{ message: $errors.name }]} />
					{/if}
				</Field.FieldContent>
			</Field.Field>

			<Field.Field data-invalid={$errors.donationEmail ? true : undefined}>
				<Field.FieldLabel for="donationEmail" class="text-label">Email</Field.FieldLabel>
				<Field.FieldContent>
					<InputGroup.Root>
						<InputGroup.Input
							id="donationEmail"
							type="email"
							placeholder="Enter your email"
							bind:value={$formData.donationEmail}
							aria-invalid={$errors.donationEmail ? true : undefined}
						/>
					</InputGroup.Root>
					{#if $errors.donationEmail}
						<Field.FieldError errors={[{ message: $errors.donationEmail }]} />
					{/if}
				</Field.FieldContent>
			</Field.Field>

			<Field.Field>
				<Field.FieldLabel for="message" class="text-label">Message (Donation)</Field.FieldLabel>
				<Field.FieldContent>
					<InputGroup.Root>
						<InputGroup.Textarea
							id="message"
							placeholder="Enter a message"
							bind:value={$formData.message}
						/>
					</InputGroup.Root>
				</Field.FieldContent>
			</Field.Field>

			<Field.Field>
				<Field.FieldLabel class="text-label">Choose a donation amount</Field.FieldLabel>
				<ToggleGroup.Root
					type="single"
					value={$formData.selectedPreset?.toString()}
					onValueChange={handlePresetAmount}
					class="grid grid-cols-3 gap-2"
				>
					{#each presets as amount}
						<ToggleGroup.Item
							value={amount.toString()}
							aria-label={`Amount ${amount}`}
							class="text-body font-bold"
						>
							₦{amount}
						</ToggleGroup.Item>
					{/each}
					<ToggleGroup.Item
						value="custom"
						aria-label="Custom amount"
						class="text-body font-bold"
					>
						<div class="flex items-center gap-2"><Coffee size={14} /> Custom</div>
					</ToggleGroup.Item>
				</ToggleGroup.Root>
			</Field.Field>

			<Field.Field data-invalid={$errors.amount ? true : undefined}>
				<Field.FieldLabel for="amount" class="text-label">Or enter a custom amount (min: 100)</Field.FieldLabel>
				<Field.FieldContent>
					<InputGroup.Root>
						<InputGroup.Input
							id="amount"
							type="number"
							min="100"
							max="10000"
							placeholder="Enter custom amount"
							bind:value={$formData.amount}
							oninput={handleCustomAmount}
							disabled={$formData.selectedPreset !== undefined}
							aria-invalid={$errors.amount ? true : undefined}
						/>
					</InputGroup.Root>
					{#if $errors.amount}
						<Field.FieldError errors={[{ message: $errors.amount }]} />
					{/if}
					{#if quantityError}
						<Field.FieldError>{quantityError}</Field.FieldError>
					{/if}
				</Field.FieldContent>
			</Field.Field>

			<Field.Field>
				<Field.FieldLabel class="text-label">Donation type</Field.FieldLabel>
				<ToggleGroup.Root
					type="single"
					value={$formData.selectedDonation}
					onValueChange={(value) => ($formData.selectedDonation = value)}
					class="grid grid-cols-2 gap-2"
				>
					<ToggleGroup.Item
						value="one-time"
						class="text-body font-bold"
					>
						One-time
					</ToggleGroup.Item>
					<ToggleGroup.Item value="monthly" disabled class="text-body font-bold">
						Monthly (soon)
					</ToggleGroup.Item>
				</ToggleGroup.Root>
			</Field.Field>

			{#if paymentError}
				<Field.FieldError>{paymentError}</Field.FieldError>
			{/if}

			{#if $formData.amount && !quantityError}
				<div class="pt-2">
					<PaystackButton
						name={$formData.name}
						email={$formData.donationEmail}
						message={$formData.message || ''}
						amount={Number($formData.amount)}
						donationType={$formData.selectedDonation || 'one-time'}
						onError={(message) => (paymentError = message)}
					/>
				</div>
			{/if}
		</Field.FieldGroup>
	</form>
</div>

<ThankYouDialog bind:open={showThankYou} donationData={receiptData} />
