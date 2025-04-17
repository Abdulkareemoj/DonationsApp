import { z } from 'zod';

export const donationSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	donationEmail: z.string().email({ message: 'Valid email is required' }),
	message: z.string().optional(),
	amount: z
		.number()
		.min(100, { message: 'Minimum donation is ₦100' })
		.max(10000, { message: 'Maximum donation is ₦10,000' })
		.optional(),
	selectedPreset: z.number().optional(),
	selectedDonation: z.enum(['one-time', 'monthly']).default('one-time').optional()
});

export type FormSchema = typeof donationSchema;
