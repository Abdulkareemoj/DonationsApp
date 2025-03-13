import Airtable from 'airtable';

export async function load() {
	const apiKey = process.env.VITE_AIRTABLE_API_KEY;
	const baseId = process.env.VITE_AIRTABLE_BASE_ID;

	if (!apiKey || !baseId) {
		throw new Error('Airtable API key or Base ID is undefined');
	}

	const base = new Airtable({ apiKey }).base(baseId);

	const donations = await new Promise((resolve, reject) => {
		const allDonations = [];
		base('Donors')
			.select({
				// Specify sorting, filtering, and fields if necessary
			})
			.eachPage(
				(records, fetchNextPage) => {
					const donationsPage = records.map((record) => ({
						id: record.id,
						name: typeof record.fields.Name === 'string' ? record.fields.Name : '',
						status: typeof record.fields.Status === 'string' ? record.fields.Status : '',
						price: parseFloat(record.fields.Price) || 0,
						quantity: parseInt(record.fields.Quantity) || 0,
						date: record.fields.Date || '',
						imageUrl: record.fields.Image?.[0]?.url || '/placeholder.svg'
					}));
					allDonations.push(...donationsPage);
					fetchNextPage();
				},
				(err) => {
					if (err) {
						reject(err);
					} else {
						resolve(allDonations);
					}
				}
			);
	});

	return {
		donations
	};
}
