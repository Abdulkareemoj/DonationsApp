declare global {
	namespace App {
		interface ValidationMessage<T = Record<string, string>> {
			status: 'error' | 'success' | 'warning';
			text: string;
			data?: T;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		PaystackPop: {
			new (): PaystackPopInstance;
		};
	}

	interface PaystackPopInstance {
		newTransaction(config: PaystackConfig): void;
	}

	interface PaystackConfig {
		key: string;
		email: string;
		amount: number;
		currency?: string;
		metadata?: Record<string, unknown>;
		onSuccess?: (response: {
			reference: string;
			trans: string;
			status: 'success' | 'failed' | 'pending';
			message: string;
			transaction: string;
			trxref: string;
			redirecturl: string;
		}) => void;
		onClose?: () => void;
	}
}

export {};
