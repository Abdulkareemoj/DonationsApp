<script lang="ts">
import { zodClient } from "sveltekit-superforms/adapters"
import { donationSchema, type FormSchema } from "./schema"
import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms"
import * as Form from "$lib/components/ui/form"
import { Button } from "$lib/components/ui/button"
import { Input } from "$lib/components/ui/input"
import { Textarea } from "$lib/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar"
import { Badge } from "$lib/components/ui/badge"
import * as ToggleGroup from "$lib/components/ui/toggle-group"
import { Label } from "$lib/components/ui/label"
import { Globe, Twitter, Instagram, Linkedin, Coffee } from "lucide-svelte"
import { tick } from "svelte"

// Constants
const MAX_DONATION_IN_NAIRA = 10000
const presets = [100, 500, 1000, 5000, 10000]

// Props
export let data

// Initialize form with superForm
const form = superForm(data.form, {
  validators: zodClient(donationSchema),
  resetForm: false,
  onUpdate: ({ form }) => {
    console.log("Form updated:", form)
  },
  onSubmit: async ({ formData, cancel }) => {
    console.log("Form submitted with values:", Object.fromEntries(formData))

    // Ensure amount is set before submission
    if (!formData.get("amount") && formData.get("selectedPreset")) {
      formData.set("amount", formData.get("selectedPreset"))
    }

    // Validate amount is present
    if (!formData.get("amount") && !formData.get("selectedPreset")) {
      quantityError = "Please select or enter a donation amount"
      cancel()
      return
    }
  },
})
  const { form: formData, enhance ,errors,  submitting } = form;
// Local state
let isCustomAmount = false
let quantityError: string | null = null

// Handle preset amount selection
function handlePresetAmount(value: string) {
  if (value === "custom") {
    isCustomAmount = true
    $formData.selectedPreset = undefined
    return
  }

  isCustomAmount = false
  quantityError = null
  const numValue = parseInt(value)
  if (!isNaN(numValue)) {
    $formData.selectedPreset = numValue
    $formData.amount = numValue // Set amount to the preset value
  }
}

// Handle custom amount input
function handleCustomAmount(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)

  if (isNaN(value)) {
    return
  }

  if (value > MAX_DONATION_IN_NAIRA) {
    quantityError = `Maximum donation amount is ${MAX_DONATION_IN_NAIRA}`
  } else if (value < 100) {
    quantityError = "Minimum donation amount is 100"
  } else {
    quantityError = null
  }

  isCustomAmount = true
  $formData.selectedPreset = undefined
  $formData.amount = value
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
      <!-- <form method="POST" use:enhance={handleSubmit} class="space-y-8"> -->
         <form method="POST" class="space-y-8">
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
        <Label>Choose a donation amount:</Label>
				<ToggleGroup.Root type="single" value={$formData.selectedPreset?.toString()} onValueChange={handlePresetAmount} class="flex flex-wrap gap-2">
					<ToggleGroup.Item value="custom" aria-label="Custom amount">
						<Coffee class="h-4 w-4" />
					</ToggleGroup.Item>
					{#each presets as amount}
						<ToggleGroup.Item value={amount.toString()} aria-label="Amount {amount}">
							{amount}
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
        </div>

        <!-- Custom Amount Field -->
        <Form.Field {form} name="amount">
          <Form.Control>
      	<Label for="amount">Or enter a custom amount (min: 100):</Label>
				<Input id="amount" type="number" min="100" max="10000" placeholder="Enter custom amount" bind:value={$formData.amount} oninput={handleCustomAmount} disabled={$formData.selectedPreset !== undefined} aria-invalid={$errors.amount ? "true" : undefined} />
				{#if $errors.amount}
					<span class="text-sm text-destructive">{$errors.amount}</span>
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
           		<Label>Donation type:</Label>
				<ToggleGroup.Root type="single" value={$formData.selectedDonation} onValueChange={(value) => ($formData.selectedDonation = value)} class="flex gap-2">
					<ToggleGroup.Item value="one-time" class="flex-1">One-time</ToggleGroup.Item>
					<ToggleGroup.Item value="monthly" class="flex-1">Monthly</ToggleGroup.Item>
				</ToggleGroup.Root>
          </Form.Control>
        </Form.Field>

        <Form.Button>Pay </Form.Button>
      </form>
    </div>
  </div>
</div>



