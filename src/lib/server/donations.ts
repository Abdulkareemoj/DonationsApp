import Airtable from 'airtable';
import { env } from '$env/dynamic/private';
import type { Donation } from '$lib/types';

type AirtableFields = Record<string, unknown>;

export type VerifiedPayment = {
	reference: string;
	email: string;
	amount: number;
	paidAt: string;
	metadata?: Record<string, unknown>;
};

type PaystackVerification = {
	status: boolean;
	message: string;
	data?: {
		status: string;
		reference: string;
		amount: number;
		currency: string;
		paid_at: string | null;
		customer: { email: string };
		metadata?: Record<string, unknown>;
	};
};

function getBase() {
	if (!env.AIRTABLE_TOKEN || !env.AIRTABLE_BASE_ID) return null;
	return new Airtable({ apiKey: env.AIRTABLE_TOKEN }).base(env.AIRTABLE_BASE_ID);
}

function tableName() {
	// Keep the original project convention. Set AIRTABLE_TABLE_NAME if your base uses another name.
	return env.AIRTABLE_TABLE_NAME || 'Donors';
}

function asText(value: unknown) {
	return typeof value === 'string' ? value : '';
}

function asNumber(value: unknown) {
	return typeof value === 'number' ? value : Number(value) || 0;
}

function toDonation(id: string, fields: AirtableFields): Donation {
	const rawDate = fields.Date;
	let dateStr: string;
	if (typeof rawDate === 'number') {
		dateStr = new Date(rawDate).toISOString();
	} else if (typeof rawDate === 'string') {
		dateStr = rawDate;
	} else {
		dateStr = '';
	}

	return {
		id,
		name: asText(fields.Name) || 'Anonymous',
		status: 'verified',
		amount: asNumber(fields.Amount),
		date: dateStr,
		message: asText(fields.Message) || undefined,
		reference: asText(fields.Reference)
	};
}

export async function fetchDonations(): Promise<Donation[]> {
	const base = getBase();
	if (!base) return [];

	try {
		const records = await base(tableName())
			.select({ sort: [{ field: 'Date', direction: 'desc' }] })
			.all();
		return records.map((record) => toDonation(record.id, record.fields as AirtableFields));
	} catch (error) {
		console.error(
			`Unable to load Airtable table "${tableName()}" in base "${env.AIRTABLE_BASE_ID ?? ''}". ` +
				'Check AIRTABLE_BASE_ID (it begins with app), AIRTABLE_TABLE_NAME (exact spelling), and the PAT base access.',
			error
		);
		return [];
	}
}

export async function saveVerifiedDonation(payment: VerifiedPayment): Promise<Donation> {
	const base = getBase();
	if (!base) {
		throw new Error('Airtable is not configured.');
	}

	const existing = await base(tableName())
		.select({
			filterByFormula: `{Reference} = '${payment.reference.replace(/'/g, "\\'")}'`,
			maxRecords: 1
		})
		.firstPage();
	if (existing[0]) return toDonation(existing[0].id, existing[0].fields as AirtableFields);

	const metadata = payment.metadata ?? {};
	const name = asText(metadata.donation_name) || 'Anonymous';
	const message = asText(metadata.donation_message);
	const dateOnly = payment.paidAt.split('T')[0];
	const record = await base(tableName()).create({
		Name: name,
		Email: payment.email,
		Amount: payment.amount,
		Frequency: 'one-time',
		Message: message,
		Reference: payment.reference,
		Date: dateOnly,
		Status: 'verified'
	}, { typecast: true });

	return toDonation(record.id, record.fields as AirtableFields);
}

export async function verifyAndSave(reference: string): Promise<Donation> {
	if (!env.PAYSTACK_SECRET_KEY) throw new Error('Payments are not configured yet.');

	const response = await fetch(
		`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
		{ headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` } }
	);
	const result = (await response.json()) as PaystackVerification;

	if (!response.ok || !result.status || !result.data) {
		throw new Error(result.message || 'Payment verification failed.');
	}

	const payment = result.data;
	if (payment.status !== 'success') {
		throw new Error(`Payment status is "${payment.status}", expected "success".`);
	}
	if (!payment.customer?.email) {
		throw new Error('Missing customer email in payment data.');
	}
	if (!payment.paid_at) {
		throw new Error('Missing paid_at in payment data.');
	}

	const donation = await saveVerifiedDonation({
		reference: payment.reference,
		email: payment.customer.email,
		amount: payment.amount / 100,
		paidAt: payment.paid_at,
		metadata: payment.metadata
	} satisfies VerifiedPayment);

	return donation;
}
