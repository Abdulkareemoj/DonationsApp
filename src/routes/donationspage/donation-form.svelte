<script lang="ts">
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { donationSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { Label } from '$lib/components/ui/label';
	import { Globe, Twitter, Instagram, Linkedin, Coffee } from 'lucide-svelte';
	import PaystackButton from './paystackButton.svelte';
	import { PUBLIC_PAYSTACK_PUBLIC_KEY } from '$env/static/public';

	// Constants
	const MAX_DONATION_IN_NAIRA = 10000;
	const presets = [100, 500, 1000, 5000, 10000];

	// Props
	export let data;

	// Initialize form with superForm
	const form = superForm(data.form, {
		validators: zodClient(donationSchema),
		resetForm: false,
		onUpdate: ({ form }) => {
			console.log('Form updated:', form);
		},
		onSubmit: async ({ formData, cancel }) => {
			console.log('Form submitted with values:', Object.fromEntries(formData));

			//  amount is set before submission
			if (!formData.get('amount')) {
				if (formData.get('selectedPreset')) {
					formData.set('amount', formData.get('selectedPreset'));
				} else {
					quantityError = 'Please select or enter a donation amount';
					cancel();
					return;
				}
			}
		}
	});
	const { form: formData, enhance, errors, submitting } = form;

	let isCustomAmount = false;
	let quantityError: string | null = null;

	// Handle preset amount selection
	function handlePresetAmount(value: string) {
		if (value === 'custom') {
			isCustomAmount = true;
			$formData.selectedPreset = undefined;
			//Important : Reset amount when custom amount is selected.
			$formData.amount = undefined;
			return;
		}

		isCustomAmount = false;
		quantityError = null;
		const numValue = parseInt(value);
		if (!isNaN(numValue)) {
			$formData.selectedPreset = numValue;
			// Ensure amount is also updated when a preset is selected
			$formData.amount = numValue;
		}
	}

	// Handle custom amount input
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
				<Button class="absolute top-3 right-3" variant="outline">Edit page</Button>
			</div>
			<div class="mt-4 flex items-center">
				<Avatar class="mr-4">
					<AvatarImage src="/placeholder.svg" />
					<AvatarFallback>HL</AvatarFallback>
				</Avatar>
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
			<div class="text-muted-foreground mt-4 flex items-center gap-3">
				<Globe class="h-5 w-5" />
				<Twitter class="h-5 w-5" />
				<Instagram class="h-5 w-5" />
				<Linkedin class="h-5 w-5" />
			</div>
			<div class="mt-4 flex flex-wrap gap-2">
				<Button variant="ghost" size="sm">New post</Button>
				<Button variant="ghost" size="sm">Add photo</Button>
				<Button variant="ghost" size="sm">Enter Youtube or Vimeo link</Button>
			</div>
			<Input placeholder="Paste Youtube or Vimeo link here..." class="mt-3" />
		</div>
		<div class="bg-muted/40 rounded-2xl border p-6 md:col-span-2">
			<form method="POST" class="space-y-6">
				<!-- Name Field -->
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Name</Form.Label>
							<Input {...props} bind:value={$formData.name} placeholder="Enter your name" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Email Field -->
				<Form.Field {form} name="donationEmail">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input
								{...props}
								bind:value={$formData.donationEmail}
								placeholder="Enter your email"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Message Field -->
				<Form.Field {form} name="message">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Message (Donation)</Form.Label>
							<Textarea {...props} bind:value={$formData.message} placeholder="Enter a message" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Donation Presets using ToggleGroup -->
				<div class="mt-2">
					<Label>Choose a donation amount</Label>
					<ToggleGroup.Root
						type="single"
						value={$formData.selectedPreset?.toString()}
						onValueChange={handlePresetAmount}
						class="mt-2 grid grid-cols-3 gap-2"
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
							<div class="flex items-center gap-2"><Coffee class="h-4 w-4" /> Custom</div>
						</ToggleGroup.Item>
					</ToggleGroup.Root>
				</div>

				<!-- Custom Amount Field -->
				<Form.Field {form} name="amount">
					<Form.Control>
						<Label for="amount">Or enter a custom amount (min: 100)</Label>
						<Input
							id="amount"
							type="number"
							min="100"
							max="10000"
							placeholder="Enter custom amount"
							bind:value={$formData.amount}
							oninput={handleCustomAmount}
							disabled={$formData.selectedPreset !== undefined}
							aria-invalid={$errors.amount ? 'true' : undefined}
						/>
						{#if $errors.amount}
							<span class="text-destructive text-sm">{$errors.amount}</span>
						{/if}
					</Form.Control>
					{#if quantityError}
						<span class="text-red-500">{quantityError}</span>
					{/if}
					<Form.FieldErrors />
				</Form.Field>

				<!-- Donation Type Selection -->
				<Form.Field {form} name="selectedDonation">
					<Form.Control>
						<Label>Donation type</Label>
						<ToggleGroup.Root
							type="single"
							value={$formData.selectedDonation}
							onValueChange={(value) => ($formData.selectedDonation = value)}
							class="mt-2 grid grid-cols-2 gap-2"
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
					</Form.Control>
				</Form.Field>

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
			</form>
		</div>
	</div>
</div>
