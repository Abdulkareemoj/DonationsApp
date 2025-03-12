import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import { createRawSnippet } from 'svelte';
import { Badge } from '$lib/components/ui/badge';
import DataTableActions from './data-table-actions.svelte';
import { Checkbox } from '$lib/components/ui/checkbox';

// Define the Donation type based on Airtable records
export type Donation = {
	id: string;
	name: string;
	status: string;
	price: number;
	quantity: number;
	date: string;
	imageUrl: string;
};

export const columns: ColumnDef<Donation>[] = [
	// Selection column
	{
		id: 'select',
		header: ({ table }) =>
			renderComponent(Checkbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				'aria-label': 'Select all'
			}),
		cell: ({ row }) =>
			renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				'aria-label': 'Select row'
			}),
		enableSorting: false,
		enableHiding: false
	},
	// Image column
	{
		accessorKey: 'imageUrl',
		header: 'Image',
		cell: ({ row }) => {
			const imageUrl = row.getValue('imageUrl') || '/placeholder.svg';

			const imageSnippet = createRawSnippet<[string]>((getImageUrl) => {
				const url = getImageUrl();
				return {
					render: () => `
            <div class="hidden sm:block">
              <img 
                src="${url}" 
                alt="Donation image" 
                class="aspect-square rounded-md object-cover h-16 w-16"
              />
            </div>
          `
				};
			});

			return renderSnippet(imageSnippet, imageUrl);
		},
		enableSorting: false
	},
	// Name column
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			const nameSnippet = createRawSnippet<[string]>((getName) => {
				const name = getName();
				return {
					render: () => `<div class="font-medium">${name}</div>`
				};
			});

			return renderSnippet(nameSnippet, row.getValue('name'));
		}
	},
	// Status column
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue('status') as string;
			return renderComponent(Badge, {
				variant: 'outline',
				children: status
			});
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		}
	},
	// Price column
	{
		accessorKey: 'price',
		header: () => {
			const priceHeaderSnippet = createRawSnippet(() => ({
				render: () => `<div class="text-right">Price</div>`
			}));
			return renderSnippet(priceHeaderSnippet, '');
		},
		cell: ({ row }) => {
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			});

			const priceCellSnippet = createRawSnippet<[string]>((getPrice) => {
				const price = getPrice();
				return {
					render: () => `<div class="text-right font-medium">${price}</div>`
				};
			});

			return renderSnippet(priceCellSnippet, formatter.format(parseFloat(row.getValue('price'))));
		},
		enableHiding: false
	},
	// Quantity column
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		cell: ({ row }) => row.getValue('quantity')
	},
	// Date column
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => {
			const date = row.getValue('date') as string;
			const formatted = new Date(date).toLocaleDateString();

			const dateCellSnippet = createRawSnippet<[string]>((getDate) => {
				const formattedDate = getDate();
				return {
					render: () => `<div>${formattedDate}</div>`
				};
			});

			return renderSnippet(dateCellSnippet, formatted);
		}
	},
	// Actions column
	{
		id: 'actions',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, { id: row.original.id });
		}
	}
];
