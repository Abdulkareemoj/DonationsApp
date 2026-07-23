export type Donation = {
	id: string;
	name: string;
	status: 'verified';
	amount: number;
	date: string;
	message?: string;
	reference: string;
};

export type ReceiptData = {
	creatorName: string;
	donorName: string;
	email: string;
	amount: number;
	reference: string;
	date: string;
	donationType: 'one-time';
};
