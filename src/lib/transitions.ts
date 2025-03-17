// Helper functions for view transitions
export function setupViewTransitions() {
	// Check if the View Transitions API is supported
	if (!document.startViewTransition) {
		return;
	}

	// Add a class to indicate view transitions are supported
	document.documentElement.classList.add('view-transitions-supported');
}
