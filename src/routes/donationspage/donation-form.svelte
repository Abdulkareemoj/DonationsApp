<script lang="ts">
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { donationSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import * as Field from '$lib/components/ui/field';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { Coffee } from '@lucide/svelte';
	import PaystackButton from './paystackButton.svelte';
	import { PUBLIC_PAYSTACK_PUBLIC_KEY } from '$env/static/public';

	const MAX_DONATION_IN_NAIRA = 10000;
	const presets = [100, 500, 1000, 5000, 10000];

	export let data;

	const form = superForm(data.form, {
		validators: zodClient(donationSchema),
		resetForm: false,
		onUpdate: ({ form }) => {
			console.log('Form updated:', form);
		},
		onSubmit: async ({ formData, cancel }) => {
			console.log('Form submitted with values:', Object.fromEntries(formData));

			const amount = formData.get('amount');
			const preset = formData.get('selectedPreset');
			if (!amount && preset) {
				formData.set('amount', String(preset));
			} else if (!amount && !preset) {
				quantityError = 'Please select or enter a donation amount';
				cancel();
				return;
			}
		}
	});
	const { form: formData, enhance, errors, submitting } = form;

	let isCustomAmount = false;
	let quantityError: string | null = null;

	function handlePresetAmount(value: string) {
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

<div class="mx-auto max-w-6xl">
	<div class="grid gap-6 md:grid-cols-5">
		<div class="bg-card rounded-2xl border p-6 shadow-sm md:col-span-3">
			<div class="relative overflow-hidden rounded-xl">
				<img src="/placeholder.svg" alt="Cover" class="h-48 w-full rounded-xl object-cover" />
			</div>
			<div class="mt-4 flex items-center">
				<Avatar.Root class="mr-4 size-12">
					<Avatar.Image src="/placeholder.svg" />
					<Avatar.Fallback>HL</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<h2 class="text-2xl font-bold">User</h2>
					<p class="text-muted-foreground">Name</p>
				</div>
				<Badge variant="secondary" class="ml-auto">143 supporters</Badge>
			</div>
			<p class="text-muted-foreground mt-4">
				Howdy fellow coder. If you're here looking for something interesting, you're in luck. Enjoy
				exclusive content when you buy me a coffee or make a donation.
			</p>
		</div>
		<div class="bg-card rounded-2xl border p-6 md:col-span-2">
			<h2 class="mb-4 text-lg font-semibold">Make a donation</h2>
			<form method="POST">
				<Field.FieldGroup>
					<!-- Name Field -->
					<Field.Field data-invalid={$errors.name ? true : undefined}>
						<Field.FieldLabel for="name">Name</Field.FieldLabel>
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

					<!-- Email Field -->
					<Field.Field data-invalid={$errors.donationEmail ? true : undefined}>
						<Field.FieldLabel for="donationEmail">Email</Field.FieldLabel>
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

					<!-- Message Field -->
					<Field.Field>
						<Field.FieldLabel for="message">Message (Donation)</Field.FieldLabel>
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

					<!-- Donation Presets -->
					<Field.Field>
						<Field.FieldLabel>Choose a donation amount</Field.FieldLabel>
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
									class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-md border px-3 py-2 text-sm"
								>
									₦{amount}
								</ToggleGroup.Item>
							{/each}
							<ToggleGroup.Item
								value="custom"
								aria-label="Custom amount"
								class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-md border px-3 py-2 text-sm"
							>
								<div class="flex items-center gap-2"><Coffee size={16} /> Custom</div>
							</ToggleGroup.Item>
						</ToggleGroup.Root>
					</Field.Field>

					<!-- Custom Amount Field -->
					<Field.Field data-invalid={$errors.amount ? true : undefined}>
						<Field.FieldLabel for="amount">Or enter a custom amount (min: 100)</Field.FieldLabel>
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

					<!-- Donation Type Selection -->
					<Field.Field>
						<Field.FieldLabel>Donation type</Field.FieldLabel>
						<ToggleGroup.Root
							type="single"
							value={$formData.selectedDonation}
							onValueChange={(value) => ($formData.selectedDonation = value)}
							class="grid grid-cols-2 gap-2"
						>
							<ToggleGroup.Item
								value="one-time"
								class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-md border px-3 py-2 text-sm"
							>
								One-time
							</ToggleGroup.Item>
							<ToggleGroup.Item
								value="monthly"
								class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-md border px-3 py-2 text-sm"
							>
								Monthly
							</ToggleGroup.Item>
						</ToggleGroup.Root>
					</Field.Field>

					{#if $formData.amount}
						<div class="pt-2">
							<PaystackButton
								email={$formData.donationEmail}
								amount={Number($formData.amount)}
								publicKey={PUBLIC_PAYSTACK_PUBLIC_KEY}
								text="Donate with Paystack"
							/>
						</div>
					{/if}
				</Field.FieldGroup>
			</form>
		</div>
	</div>
</div>
