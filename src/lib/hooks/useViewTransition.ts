import { goto } from '$app/navigation';

/**
 * Custom navigation function that uses the View Transitions API
 * @param url The URL to navigate to
 */
export function navigateWithTransition(url: string): void {
	if (!document.startViewTransition) {
		// Fallback for browsers that don't support View Transitions
		goto(url);
		return;
	}

	// Use the View Transitions API
	document.startViewTransition(() => {
		goto(url);
	});
}
