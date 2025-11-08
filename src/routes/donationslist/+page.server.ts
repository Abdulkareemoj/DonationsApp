import Airtable from 'airtable';
import type { Donation } from './column';

export async function load() {
    try {
        const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
        const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

        if (!apiKey || !baseId) {
            return { donations: [] as Donation[], error: 'Missing Airtable configuration' };
        }

        const base = new Airtable({ apiKey }).base(baseId);

        const donations = await new Promise((resolve, reject) => {
            const allDonations: Donation[] = [];
            base('Donors')
                .select({
                    // Specify sorting, filtering, and fields if necessary
                })
                .eachPage(
                    (records, fetchNextPage) => {
                        const donationsPage = records.map((record) => {
                            const fields = record.fields as Record<string, unknown>;
                            const imageArray = (fields.Image as { url: string }[] | undefined) || [];
                            return {
                                id: record.id,
                                name: typeof fields.Name === 'string' ? (fields.Name as string) : '',
                                status: typeof fields.Status === 'string' ? (fields.Status as string) : '',
                                amount: typeof fields.Price === 'number' ? (fields.Price as number) : parseFloat(String(fields.Price ?? 0)) || 0,
                                quantity: typeof fields.Quantity === 'number' ? (fields.Quantity as number) : parseInt(String(fields.Quantity ?? 0)) || 0,
                                date: typeof fields.Date === 'string' ? (fields.Date as string) : String(fields.Date ?? ''),
                                imageUrl: imageArray[0]?.url || '/placeholder.svg'
                            } as Donation;
                        });
                        allDonations.push(...donationsPage);
                        fetchNextPage();
                    },
                    (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(allDonations as Donation[]);
                        }
                    }
                );
        });

        return { donations: donations as Donation[], error: null };
    } catch (e) {
        return { donations: [] as Donation[], error: (e as Error).message ?? 'Failed to fetch donations' };
    }
}
