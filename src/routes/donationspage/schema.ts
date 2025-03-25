import { z } from 'zod';

export const donationSchema = z.object({
	name: z.string().min(1, { message: 'Name is required.' }),
	donationEmail: z.string().email({ message: 'Invalid email address.' }),
	message: z.string().optional(),
	amount: z.number().min(100, { message: 'Minimum donation is 100 Naira.' }),
	selectedPreset: z.number().optional(),
	selectedDonation: z.string().optional()
	// privateMessage: z.boolean().optional()
});

export type FormSchema = typeof donationSchema;
