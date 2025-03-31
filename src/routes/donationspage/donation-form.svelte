<script lang="ts">
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { donationSchema, type FormSchema } from './schema';
  import {
    type SuperValidated,
    type Infer,
    superForm,
    type SuperFormEvents
  } from 'sveltekit-superforms';
  import * as Form from '$lib/components/ui/form';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
  import { Badge } from '$lib/components/ui/badge';
  import * as ToggleGroup from '$lib/components/ui/toggle-group';
  import { tick } from 'svelte'; // Import tick

  import { Globe, Twitter, Instagram, Linkedin, Coffee } from 'lucide-svelte';

  const MAX_DONATION_IN_NAIRA = 10000;
  const DONATION_IN_NAIRA = 100;

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } =
    $props();

  console.log('DonationForm Data:', data);

  const form = superForm<Infer<FormSchema>>(data.form, {
    validators: zodClient(donationSchema)
  });
  console.log('Form:', form);

  // Extract what we need from superForm
  const { form: formData, errors, enhance } = form;

  let quantity = $state(0);
  let quantityError = $state<string | null>(null);
  let isCustomAmount = $state(false);

  async function handleQuantityChange(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value, 10);

    if (value > MAX_DONATION_IN_NAIRA) {
      quantityError = `Maximum donation amount is ${MAX_DONATION_IN_NAIRA}`;
    } else {
      quantityError = null;
    }

    quantity = value;
    $formData.amount = value;
    $formData.selectedPreset = undefined; // Clear preset selection when custom amount is entered
    isCustomAmount = true;

    await tick(); // Ensure Svelte updates the form
    console.log('formData after handleQuantityChange:', $formData);
  }

  const presets = [100, 500, 1000, 5000, 10000];

  async function selectDonationType(type: string | undefined): Promise<void> {
    $formData.selectedDonation = type;
    await tick(); // Ensure Svelte updates the form
    console.log('formData after selectDonationType:', $formData);
  }

  async function selectPreset(preset: number): Promise<void> {
    $formData.selectedPreset = preset;
    $formData.amount = preset; // Make sure amount is set for form submission
    quantity = preset;
    isCustomAmount = false;
    await tick(); // Ensure Svelte updates the form
    console.log('formData after selectPreset:', $formData);
  }

  async function switchToCustomAmount(): Promise<void> {
    $formData.selectedPreset = undefined;
    isCustomAmount = true;
    await tick(); // Ensure Svelte updates the form
    // Focus the input field after switching
    setTimeout(() => {
      document.querySelector('input[name="amount"]')?.focus();
    }, 0);
  }

  async function handleSubmit() {
    // Before form submission, ensure the amount is correctly set
    if ($formData.selectedPreset !== undefined) {
      $formData.amount = $formData.selectedPreset;
    } else if (isCustomAmount) {
      $formData.amount = quantity;
    }
    await tick(); // Ensure Svelte updates the form
    console.log('Form submitted with values:', $formData);

    // Return the enhance handler
    return async ({ result, update }) => {
      console.log('enhance function called');
      await update({ resetForm: false });
    };
  }
</script>

<div
  class="max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-lg overflow-hidden"
>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-2/3 p-6">
      <div class="relative">
        <img
          src="/placeholder.svg"
          alt="Cover"
          class="w-full h-48 object-cover rounded-lg"
        />
        <Button class="absolute top-2 right-2" variant="outline">
          Edit page
        </Button>
      </div>
      <div class="flex items-center mt-4">
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
      <p class="mt-4 text-muted-foreground">
        Howdy fellow coder. If you're here looking for something intresting
        you're in luck.. Got a whole lot of this going on inside if you buy me a
        coffee or just make a nice donation.
      </p>
      <div class="flex items-center mt-4 space-x-2">
        <Globe class="h-6 w-6" />
        <Twitter class="h-6 w-6" />
        <Instagram class="h-6 w-6" />
        <Linkedin class="h-6 w-6" />
      </div>
      <div class="flex items-center mt-4 space-x-4">
        <Button variant="ghost">New post</Button>
        <Button variant="ghost">Add photo</Button>
        <Button variant="ghost">Enter Youtube or Vimeo link</Button>
      </div>
      <Input
        placeholder="Paste Youtube or Vimeo link here..."
        class="mt-4"
      />
    </div>
    <div class="w-full md:w-2/5 p-6 bg-gray-200 border-l">
      <form method="POST" use:enhance={handleSubmit} class="space-y-8">
        <!-- Name Field -->
        <Form.Field {form} name="name">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Name</Form.Label>
              <Input
                {...props}
                bind:value={$formData.name}
                placeholder="Enter your name"
              />
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
              <Textarea
                {...props}
                bind:value={$formData.message}
                placeholder="Enter a message"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <!-- Donation Presets using ToggleGroup -->
        <div class="mt-6">
          <h3 class="text-sm font-medium mb-2">Choose a donation amount:</h3>
          <div class="flex items-center space-x-2">
            <Coffee class="h-6 w-6" />
            <ToggleGroup.Root
              type="single"
              value={$formData.selectedPreset?.toString()}
              onValueChange={async (value) => {
                if (value) {
                  const preset = parseInt(value, 10);
                  await selectPreset(preset);
                } else {
                  // If value is null/undefined (deselected), switch to custom amount
                  await switchToCustomAmount();
                }
              }}
            >
              {#each presets as preset}
                <ToggleGroup.Item
                  value={preset.toString()}
                  disabled={isCustomAmount}
                  class="px-3 py-1 text-sm font-medium rounded-full"
                >
                  {preset}
                </ToggleGroup.Item>
              {/each}
            </ToggleGroup.Root>
          </div>
        </div>

        <!-- Custom Amount Field -->
        <Form.Field {form} name="amount">
          <Form.Control>
            {#snippet children({ props })}
              <div class="flex items-center justify-between">
                <Form.Label
                  >Or enter a custom amount (max: {MAX_DONATION_IN_NAIRA}):</Form.Label
                >
                {#if $formData.selectedPreset !== undefined}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onclick={switchToCustomAmount}
                    class="text-xs text-blue-600 hover:text-blue-800"
                  >
                    or use custom amount
                  </Button>
                {/if}
              </div>
              <Input
                {...props}
                type="number"
                value={isCustomAmount ? quantity : ''}
                oninput={handleQuantityChange}
                onfocus={() => {
                  if (!isCustomAmount) {
                    // Clear preset when focusing on custom amount
                    $formData.selectedPreset = undefined;
                    isCustomAmount = true;
                  }
                }}
                placeholder="Enter custom amount"
                min={100}
                max={MAX_DONATION_IN_NAIRA}
                required
                disabled={$formData.selectedPreset !== undefined}
              />
            {/snippet}
          </Form.Control>
          {#if quantityError}
            <span class="text-red-500">{quantityError}</span>
          {/if}
          <Form.FieldErrors />
        </Form.Field>

        <!-- Donation Type Selection -->
        <Form.Field {form} name="selectedDonation">
          <Form.Control>
            {#snippet children({ props })}
              <div class="flex mt-4 space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  class={`flex-1 ${
                    $formData.selectedDonation === 'one-time'
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-black'
                  }`}
                  onclick={async () => await selectDonationType('one-time')}
                >
                  One-time
                </Button>
                <Button
                  type="button"
                  variant="default"
                  class={`flex-1 ${
                    $formData.selectedDonation === 'monthly'
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-black'
                  }`}
                  onclick={async () => await selectDonationType('monthly')}
                >
                  Monthly
                </Button>
              </div>
            {/snippet}
          </Form.Control>
        </Form.Field>

        <Form.Button>Pay </Form.Button>
      </form>
    </div>
  </div>
</div>
