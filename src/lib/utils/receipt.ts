import jsPDF from 'jspdf';

export interface ReceiptData {
	creatorName: string;
	donorName: string;
	email: string;
	amount: number;
	reference: string;
	date: string;
	donationType: string;
}

export function buildReceiptPdf(data: ReceiptData): jsPDF {
	const doc = new jsPDF();
	const pageWidth = doc.internal.pageSize.getWidth();

	doc.setFont('helvetica', 'bold');
	doc.setFontSize(20);
	doc.text('Donation Receipt', pageWidth / 2, 30, { align: 'center' });

	doc.setFont('helvetica', 'normal');
	doc.setFontSize(10);
	doc.text(`Receipt for your donation to ${data.creatorName}`, pageWidth / 2, 40, { align: 'center' });

	doc.setDrawColor(28, 41, 60);
	doc.setLineWidth(0.5);
	doc.line(20, 50, pageWidth - 20, 50);

	const startY = 65;
	const labelX = 20;
	const valueX = 90;

	const fields: [string, string][] = [
		['Donor Name', data.donorName],
		['Email', data.email],
		['Amount', `₦${data.amount.toLocaleString()}`],
		['Type', data.donationType],
		['Reference', data.reference],
		['Date', new Date(data.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })]
	];

	fields.forEach(([label, value], i) => {
		const y = startY + i * 14;
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(11);
		doc.text(label, labelX, y);
		doc.setFont('helvetica', 'normal');
		doc.text(value, valueX, y);
	});

	doc.setDrawColor(28, 41, 60);
	doc.line(20, startY + fields.length * 14 + 5, pageWidth - 20, startY + fields.length * 14 + 5);

	doc.setFont('helvetica', 'italic');
	doc.setFontSize(9);
	doc.text(
		'Thank you for your generous support! This receipt can be used for your records.',
		pageWidth / 2,
		startY + fields.length * 14 + 20,
		{ align: 'center' }
	);

	doc.setFont('helvetica', 'normal');
	doc.setFontSize(8);
	doc.text(`Generated on ${new Date().toLocaleString()}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 20, {
		align: 'center'
	});

	return doc;
}

export function downloadReceipt(data: ReceiptData): void {
	const doc = buildReceiptPdf(data);
	doc.save(`donation-receipt-${data.reference}.pdf`);
}
